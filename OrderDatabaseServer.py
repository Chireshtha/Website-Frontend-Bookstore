from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import json
import os



app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bookstore'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

# Function to create the tables
def create_tables():
    try:
        cur = mysql.connection.cursor()
        
        # Create tables if they do not exist
        cur.execute("""
        CREATE TABLE IF NOT EXISTS book_details (
            book_id INT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255),
            description TEXT,
            image_url VARCHAR(255),
            price DECIMAL(10, 2),
            original_price DECIMAL(10, 2),
            discount_percentage DECIMAL(5, 2),
            amount INT,
            is_available BOOLEAN DEFAULT TRUE
        );
        """)
        
        cur.execute("""
        CREATE TABLE IF NOT EXISTS users_details (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(15),
            phoneAlt VARCHAR(15),
            city VARCHAR(100),
            state VARCHAR(100),
            landmark TEXT,
            pincode VARCHAR(10),
            address TEXT
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS orders_details (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            book_title VARCHAR(255),
            quantity INT,
            price DECIMAL(10, 2),
            FOREIGN KEY (user_id) REFERENCES users_details(user_id) ON DELETE CASCADE
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS order_price (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            total_price DECIMAL(10, 2),
            FOREIGN KEY (user_id) REFERENCES users_details(user_id) ON DELETE CASCADE
        );
        """)
        mysql.connection.commit()
        cur.close()
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {str(e)}")

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/Books_Details", methods = ['GET','POST'])
def Books_Detail():
    try:
        if request.method == 'POST':   
            
            file_path = os.path.join("C:/Users/Chireshtha V/Desktop/BookStore/frontend/src/Components/Books.json")
              
            with open(file_path, 'r', encoding='utf-8') as f:
                books = json.load(f)
                print(f"Books loaded: {books}") 
                
            cur = mysql.connection.cursor()
            
            for book in books:
                cur.execute("""INSERT INTO book_details(book_id, title, author, description, image_url, price, original_price, discount_percentage, amount, is_available) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (book['bookId'], book['bookTitle'], book['Author'], book['description'], book['ImageUrl'], book['price'], book['originalPrice'], book['discountPercentage'], book['amount'], True))

            mysql.connection.commit()
            cur.close()
            return jsonify({'message':'Book details populated successfully'})
        
        elif request.method == 'GET':
            cur = mysql.connection.cursor()
            cur.execute("""SELECT book_id, title, author, description, image_url, price, original_price, discount_percentage, amount, is_available FROM book_details""")
            bookDetails = cur.fetchall() 
            response = [] 
            for bookDetail in bookDetails:
                book_info = {
                    'book_id' : bookDetail[0],
                    'title' : bookDetail[1],
                    'author' : bookDetail[2],
                    'description' : bookDetail[3],
                    'image_url' : bookDetail[4],
                    'price' : bookDetail[5],
                    'original_price' : bookDetail[6],
                    'discount_percentage' : bookDetail[7],
                    'amount' : bookDetail[8],
                    'is_available' : bookDetail[9],
                }
                response.append(book_info)
            cur.close()
            return jsonify(response)
            
    except Exception as e:
        return jsonify({'message':'Failed to populate books', 'error':str(e)})

@app.route("/ShippingCart", methods= ['GET','POST'])
def ShippingCart():
    
    try:        
        if request.method == 'POST':     
            data = request.get_json()
            user_details = data['userDetails']
            cart_items = data['cart']
            total_price = data['price']
        

            cur = mysql.connection.cursor()
            cur.execute("""INSERT INTO users_details (name, phone, phoneAlt, city, state, landmark, pincode, address) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)""", (user_details['name'], user_details['phone'], user_details['phoneAlt'], user_details['city'], user_details['state'], user_details['landmark'], user_details['pincode'], user_details['address']))
            
            user_id =cur.lastrowid
            
            for item in cart_items:
                cur.execute("""INSERT INTO orders_details (user_id, book_title, quantity, price) VALUES(%s, %s, %s, %s)""", (user_id, item['title'], item['amount'], item['price']))
                
                cur.execute("""UPDATE book_details SET amount = amount - %s WHERE title = %s""", (item['amount'], item['book_title']))
                
                cur.execute("""UPDATE book_details SET is_available = FALSE WHERE title = %s AND amount <= 0""", (item['book_title'],))
                

            cur.execute("""INSERT INTO order_price(user_id, total_price) VALUES(%s, %s)""", (user_id, total_price))
            
            mysql.connection.commit()
            cur.close()
            
            return jsonify({'message':'Order placed successfully'}), 200  #Success
        elif request.method == 'GET':
            #Handle get request
            cur = mysql.connection.cursor()
            cur.execute("""SELECT  u.user_id, u.name, u.phone, u.phoneAlt, u.city, u.state, u.landmark, u.pincode, u.address, o.book_title, o.quantity, o.price, p.total_price FROM users_details u JOIN orders_details o ON u.user_id = o.user_id JOIN order_price p ON u.user_id = p.user_id""")
            orders = cur.fetchall()
            
            response = []
            for order in orders:
                order_info = {
                    'user_id': order[0],
                    'name':order[1],
                    'phone': order[2],
                    'phoneAlt':order[3],
                    'city':order[4],
                    'state':order[5],
                    'landmark':order[6],
                    'pincode':order[7],
                    'address':order[8],
                    'book_title':order[9],
                    'quantity':order[10],
                    'price':order[11],
                    'total_price':order[12]
                }
                response.append(order_info)
            cur.close()
            return jsonify(response)
            
    except Exception as e:
        return jsonify({'message':'Failed to place order', 'error': str(e)}), 500 #internal error


if __name__ == "__main__":
    with app.app_context():
        create_tables() # Call the function to create the tables when the app starts
    app.run(debug=True)
