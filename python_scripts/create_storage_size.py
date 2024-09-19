import psycopg2

def fetch_components():
    try:
        # Connect to your postgres DB
        connection = psycopg2.connect(
            dbname="Components",
            user="postgres",
            password="testpassword",
            host="localhost",  # or your server's IP address
            port="5432"        # default port for PostgreSQL
        )

        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query
        cursor.execute('''
            SELECT "Model" FROM public.components
            WHERE "Type" = 'SSD'
            ORDER BY id ASC;
        ''')

        # Fetch all rows from the executed query
        records = cursor.fetchall()

        # Print the results
        for row in records:
            print(row)

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == "__main__":
    fetch_components()