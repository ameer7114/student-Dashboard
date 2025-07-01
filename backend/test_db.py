import mysql.connector
from mysql.connector import Error

try:
    # Connect to MySQL using the same credentials as app.py
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",  # Replace with your MySQL root password
        database="student_results_db"
    )
    cursor = db.cursor(dictionary=True)  # Use dictionary=True to match app.py's cursor

    # Verify the current database
    cursor.execute("SELECT DATABASE();")
    db_name = cursor.fetchone()
    print(f"Connected to database: {db_name['DATABASE()']}")

    # Verify the table exists
    cursor.execute("SHOW TABLES LIKE 'student_results';")
    table = cursor.fetchone()
    if table:
        print("Table 'student_results' exists")
    else:
        print("Table 'student_results' does NOT exist")

    # Fetch and display sample data
    cursor.execute("SELECT * FROM student_results LIMIT 5;")
    results = cursor.fetchall()
    print("Sample data from student_results:")
    for row in results:
        print(row)

    # Close the connection
    cursor.close()
    db.close()
    print("Database connection closed")

except Error as err:
    print(f"Error: {err}")