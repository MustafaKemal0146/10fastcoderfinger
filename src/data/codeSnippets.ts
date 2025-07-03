import { CodeSnippet } from '../types';

export const mockCodeSnippets: CodeSnippet[] = [
  // C# Easy Examples
  {
    id: 'csharp-easy-1',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Hello World',
    description: 'Basic console output',
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-2',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Variables and Types',
    description: 'Basic variable declarations',
    code: `int age = 25;
string name = "John";
bool isActive = true;
double price = 19.99;

Console.WriteLine($"Name: {name}, Age: {age}");`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-3',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Simple Loop',
    description: 'Basic for loop example',
    code: `for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"Number: {i}");
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-4',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Array Operations',
    description: 'Working with arrays',
    code: `int[] numbers = {1, 2, 3, 4, 5};

foreach (int num in numbers)
{
    Console.WriteLine(num * 2);
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-5',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Simple Method',
    description: 'Basic method definition',
    code: `static int Add(int a, int b)
{
    return a + b;
}

int result = Add(5, 3);
Console.WriteLine(result);`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-6',
    language: 'csharp',
    difficulty: 'easy',
    title: 'String Manipulation',
    description: 'Basic string operations',
    code: `string text = "Hello World";
string upper = text.ToUpper();
string lower = text.ToLower();
int length = text.Length;

Console.WriteLine($"Upper: {upper}");
Console.WriteLine($"Length: {length}");`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-7',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Conditional Statement',
    description: 'If-else conditions',
    code: `int score = 85;

if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else
{
    Console.WriteLine("Grade: C");
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-8',
    language: 'csharp',
    difficulty: 'easy',
    title: 'List Operations',
    description: 'Working with List<T>',
    code: `List<string> names = new List<string>();
names.Add("Alice");
names.Add("Bob");
names.Add("Charlie");

foreach (string name in names)
{
    Console.WriteLine($"Hello, {name}!");
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-9',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Switch Statement',
    description: 'Switch case example',
    code: `int day = 3;
string dayName = day switch
{
    1 => "Monday",
    2 => "Tuesday",
    3 => "Wednesday",
    4 => "Thursday",
    5 => "Friday",
    _ => "Weekend"
};

Console.WriteLine(dayName);`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-easy-10',
    language: 'csharp',
    difficulty: 'easy',
    title: 'Exception Handling',
    description: 'Try-catch example',
    code: `try
{
    int result = 10 / 0;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero!");
}
finally
{
    Console.WriteLine("Operation completed.");
}`,
    created_at: new Date().toISOString()
  },

  // C# Medium Examples
  {
    id: 'csharp-medium-1',
    language: 'csharp',
    difficulty: 'medium',
    title: 'Class Definition',
    description: 'Object-oriented programming basics',
    code: `public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }
}

Person person = new Person("John", 30);
person.Introduce();`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-medium-2',
    language: 'csharp',
    difficulty: 'medium',
    title: 'Interface Implementation',
    description: 'Working with interfaces',
    code: `public interface IShape
{
    double CalculateArea();
}

public class Circle : IShape
{
    private double radius;
    
    public Circle(double radius)
    {
        this.radius = radius;
    }
    
    public double CalculateArea()
    {
        return Math.PI * radius * radius;
    }
}

Circle circle = new Circle(5);
double area = circle.CalculateArea();`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-medium-3',
    language: 'csharp',
    difficulty: 'medium',
    title: 'Generic Method',
    description: 'Generic programming example',
    code: `public static T FindMax<T>(T[] array) where T : IComparable<T>
{
    if (array.Length == 0)
        throw new ArgumentException("Array cannot be empty");
    
    T max = array[0];
    for (int i = 1; i < array.Length; i++)
    {
        if (array[i].CompareTo(max) > 0)
            max = array[i];
    }
    return max;
}

int[] numbers = {3, 7, 2, 9, 1};
int maxNumber = FindMax(numbers);`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-medium-4',
    language: 'csharp',
    difficulty: 'medium',
    title: 'Event Handling',
    description: 'Events and delegates',
    code: `public class Publisher
{
    public event Action<string> OnMessagePublished;
    
    public void PublishMessage(string message)
    {
        OnMessagePublished?.Invoke(message);
    }
}

Publisher pub = new Publisher();
pub.OnMessagePublished += msg => Console.WriteLine($"Received: {msg}");
pub.PublishMessage("Hello World!");`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-medium-5',
    language: 'csharp',
    difficulty: 'medium',
    title: 'Extension Methods',
    description: 'Extending existing types',
    code: `public static class StringExtensions
{
    public static bool IsPalindrome(this string str)
    {
        string cleaned = str.ToLower().Replace(" ", "");
        char[] chars = cleaned.ToCharArray();
        Array.Reverse(chars);
        return cleaned == new string(chars);
    }
}

string text = "A man a plan a canal Panama";
bool isPalindrome = text.IsPalindrome();
Console.WriteLine($"Is palindrome: {isPalindrome}");`,
    created_at: new Date().toISOString()
  },

  // C# Hard Examples
  {
    id: 'csharp-hard-1',
    language: 'csharp',
    difficulty: 'hard',
    title: 'LINQ Query',
    description: 'Complex LINQ operations',
    code: `var students = new[]
{
    new { Name = "Alice", Grade = 85, Subject = "Math" },
    new { Name = "Bob", Grade = 92, Subject = "Science" },
    new { Name = "Charlie", Grade = 78, Subject = "Math" },
    new { Name = "Diana", Grade = 95, Subject = "Science" }
};

var topStudents = students
    .Where(s => s.Grade > 80)
    .GroupBy(s => s.Subject)
    .Select(g => new
    {
        Subject = g.Key,
        TopStudent = g.OrderByDescending(s => s.Grade).First(),
        AverageGrade = g.Average(s => s.Grade)
    });

foreach (var group in topStudents)
{
    Console.WriteLine($"{group.Subject}: {group.TopStudent.Name} ({group.AverageGrade:F1})");
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-hard-2',
    language: 'csharp',
    difficulty: 'hard',
    title: 'Async/Await Pattern',
    description: 'Asynchronous programming',
    code: `public async Task<string> FetchDataAsync(string url)
{
    using HttpClient client = new HttpClient();
    try
    {
        HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"Request failed: {ex.Message}");
        return null;
    }
}

public async Task ProcessDataAsync()
{
    string data = await FetchDataAsync("https://api.example.com/data");
    if (data != null)
    {
        Console.WriteLine($"Received {data.Length} characters");
    }
}`,
    created_at: new Date().toISOString()
  },
  {
    id: 'csharp-hard-3',
    language: 'csharp',
    difficulty: 'hard',
    title: 'Custom Attribute',
    description: 'Reflection and attributes',
    code: `[AttributeUsage(AttributeTargets.Property)]
public class ValidateRangeAttribute : Attribute
{
    public int Min { get; }
    public int Max { get; }
    
    public ValidateRangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
    }
}

public class Product
{
    [ValidateRange(1, 100)]
    public int Quantity { get; set; }
}

public static bool ValidateObject(object obj)
{
    var properties = obj.GetType().GetProperties();
    foreach (var prop in properties)
    {
        var attr = prop.GetCustomAttribute<ValidateRangeAttribute>();
        if (attr != null)
        {
            int value = (int)prop.GetValue(obj);
            if (value < attr.Min || value > attr.Max)
                return false;
        }
    }
    return true;
}`,
    created_at: new Date().toISOString()
  },

  // Python Easy Examples
  {
    id: 'python-easy-1',
    language: 'python',
    difficulty: 'easy',
    title: 'Hello World',
    description: 'Basic print statement',
    code: `print("Hello, World!")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-2',
    language: 'python',
    difficulty: 'easy',
    title: 'Variables and Types',
    description: 'Basic variable assignments',
    code: `name = "Alice"
age = 30
height = 5.6
is_student = True

print(f"Name: {name}, Age: {age}")
print(f"Height: {height}, Student: {is_student}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-3',
    language: 'python',
    difficulty: 'easy',
    title: 'Simple Loop',
    description: 'Basic for loop',
    code: `for i in range(1, 6):
    print(f"Number: {i}")

fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-4',
    language: 'python',
    difficulty: 'easy',
    title: 'List Operations',
    description: 'Working with lists',
    code: `numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.remove(3)

print(f"Length: {len(numbers)}")
print(f"First: {numbers[0]}, Last: {numbers[-1]}")

squared = [x**2 for x in numbers]
print(f"Squared: {squared}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-5',
    language: 'python',
    difficulty: 'easy',
    title: 'Simple Function',
    description: 'Function definition and call',
    code: `def greet(name, age=None):
    if age:
        return f"Hello {name}, you are {age} years old!"
    else:
        return f"Hello {name}!"

message1 = greet("Alice")
message2 = greet("Bob", 25)
print(message1)
print(message2)`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-6',
    language: 'python',
    difficulty: 'easy',
    title: 'Dictionary Usage',
    description: 'Working with dictionaries',
    code: `person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

person["email"] = "john@example.com"
print(f"Name: {person['name']}")

for key, value in person.items():
    print(f"{key}: {value}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-7',
    language: 'python',
    difficulty: 'easy',
    title: 'Conditional Statements',
    description: 'If-elif-else conditions',
    code: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-8',
    language: 'python',
    difficulty: 'easy',
    title: 'String Methods',
    description: 'String manipulation',
    code: `text = "  Hello World  "
print(f"Original: '{text}'")
print(f"Stripped: '{text.strip()}'")
print(f"Upper: '{text.upper()}'")
print(f"Replace: '{text.replace('World', 'Python')}'")

words = text.strip().split()
print(f"Words: {words}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-9',
    language: 'python',
    difficulty: 'easy',
    title: 'File Reading',
    description: 'Basic file operations',
    code: `# Writing to file
with open('sample.txt', 'w') as file:
    file.write("Hello, World!\\n")
    file.write("This is a test file.")

# Reading from file
with open('sample.txt', 'r') as file:
    content = file.read()
    print(content)

# Reading line by line
with open('sample.txt', 'r') as file:
    for line in file:
        print(f"Line: {line.strip()}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-easy-10',
    language: 'python',
    difficulty: 'easy',
    title: 'Exception Handling',
    description: 'Try-except blocks',
    code: `try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    print("Operation completed.")`,
    created_at: new Date().toISOString()
  },

  // Python Medium Examples
  {
    id: 'python-medium-1',
    language: 'python',
    difficulty: 'medium',
    title: 'Class Definition',
    description: 'Object-oriented programming',
    code: `class BankAccount:
    def __init__(self, account_number, initial_balance=0):
        self.account_number = account_number
        self._balance = initial_balance
    
    @property
    def balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def __str__(self):
        return f"Account {self.account_number}: \${self._balance:.2f}"

account = BankAccount("12345", 1000)
account.deposit(500)
account.withdraw(200)
print(account)`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-medium-2',
    language: 'python',
    difficulty: 'medium',
    title: 'Generator Function',
    description: 'Working with generators',
    code: `def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

def prime_generator(limit):
    def is_prime(num):
        if num < 2:
            return False
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                return False
        return True
    
    for num in range(2, limit + 1):
        if is_prime(num):
            yield num

# Using generators
fib_numbers = list(fibonacci_generator(10))
prime_numbers = list(prime_generator(20))

print(f"Fibonacci: {fib_numbers}")
print(f"Primes: {prime_numbers}")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-medium-3',
    language: 'python',
    difficulty: 'medium',
    title: 'Decorator Pattern',
    description: 'Function decorators',
    code: `import time
from functools import wraps

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

def retry_decorator(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    print(f"Attempt {attempt + 1} failed: {e}")
            return None
        return wrapper
    return decorator

@timing_decorator
@retry_decorator(max_attempts=2)
def risky_operation(x):
    if x < 0.5:
        raise ValueError("Value too small")
    return x * 2

result = risky_operation(0.7)`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-medium-4',
    language: 'python',
    difficulty: 'medium',
    title: 'Context Manager',
    description: 'Custom context managers',
    code: `class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        print(f"Connecting to {self.connection_string}")
        self.connection = f"Connected to {self.connection_string}"
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection")
        self.connection = None
        if exc_type:
            print(f"Exception occurred: {exc_val}")
        return False

from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    print(f"Opening file {filename}")
    file = open(filename, mode)
    try:
        yield file
    finally:
        print(f"Closing file {filename}")
        file.close()

# Usage
with DatabaseConnection("localhost:5432") as conn:
    print(f"Using connection: {conn}")

with file_manager("test.txt", "w") as f:
    f.write("Hello, World!")`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-medium-5',
    language: 'python',
    difficulty: 'medium',
    title: 'Regular Expressions',
    description: 'Pattern matching with regex',
    code: `import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def extract_phone_numbers(text):
    pattern = r'\\b\\d{3}-\\d{3}-\\d{4}\\b'
    return re.findall(pattern, text)

def clean_text(text):
    # Remove extra whitespace
    text = re.sub(r'\\s+', ' ', text)
    # Remove special characters except letters, numbers, and spaces
    text = re.sub(r'[^a-zA-Z0-9\\s]', '', text)
    return text.strip()

# Examples
emails = ["user@example.com", "invalid-email", "test@domain.org"]
for email in emails:
    print(f"{email}: {'Valid' if validate_email(email) else 'Invalid'}")

text = "Call me at 123-456-7890 or 987-654-3210"
phones = extract_phone_numbers(text)
print(f"Phone numbers: {phones}")

messy_text = "  Hello!!!   World???   "
clean = clean_text(messy_text)
print(f"Cleaned: '{clean}'")`,
    created_at: new Date().toISOString()
  },

  // Python Hard Examples
  {
    id: 'python-hard-1',
    language: 'python',
    difficulty: 'hard',
    title: 'Metaclass Example',
    description: 'Advanced metaclass programming',
    code: `class SingletonMeta(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class ValidationMeta(type):
    def __new__(mcs, name, bases, attrs):
        # Add validation to all methods
        for key, value in attrs.items():
            if callable(value) and not key.startswith('_'):
                attrs[key] = mcs.add_validation(value)
        return super().__new__(mcs, name, bases, attrs)
    
    @staticmethod
    def add_validation(func):
        def wrapper(self, *args, **kwargs):
            print(f"Validating call to {func.__name__}")
            if hasattr(self, 'validate'):
                self.validate()
            return func(self, *args, **kwargs)
        return wrapper

class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connection = "Connected"
    
    def query(self, sql):
        return f"Executing: {sql}"

class User(metaclass=ValidationMeta):
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def validate(self):
        if not self.name or not self.email:
            raise ValueError("Name and email are required")
    
    def save(self):
        return f"Saving user {self.name}"

# Usage
db1 = Database()
db2 = Database()
print(f"Same instance: {db1 is db2}")

user = User("John", "john@example.com")
result = user.save()`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-hard-2',
    language: 'python',
    difficulty: 'hard',
    title: 'Async Programming',
    description: 'Asynchronous programming with asyncio',
    code: `import asyncio
import aiohttp
import time

async def fetch_url(session, url):
    try:
        async with session.get(url) as response:
            content = await response.text()
            return {"url": url, "status": response.status, "length": len(content)}
    except Exception as e:
        return {"url": url, "error": str(e)}

async def fetch_multiple_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return results

async def producer(queue, items):
    for item in items:
        await queue.put(item)
        print(f"Produced: {item}")
        await asyncio.sleep(0.1)
    await queue.put(None)  # Sentinel value

async def consumer(queue, consumer_id):
    while True:
        item = await queue.get()
        if item is None:
            await queue.put(None)  # Pass sentinel to other consumers
            break
        print(f"Consumer {consumer_id} processing: {item}")
        await asyncio.sleep(0.2)
        queue.task_done()

async def main():
    # URL fetching example
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/status/200"
    ]
    
    start_time = time.time()
    results = await fetch_multiple_urls(urls)
    end_time = time.time()
    
    print(f"Fetched {len(results)} URLs in {end_time - start_time:.2f} seconds")
    
    # Producer-consumer example
    queue = asyncio.Queue(maxsize=5)
    items = list(range(10))
    
    producer_task = asyncio.create_task(producer(queue, items))
    consumer_tasks = [
        asyncio.create_task(consumer(queue, i)) 
        for i in range(3)
    ]
    
    await producer_task
    await asyncio.gather(*consumer_tasks)

# Run the async main function
asyncio.run(main())`,
    created_at: new Date().toISOString()
  },
  {
    id: 'python-hard-3',
    language: 'python',
    difficulty: 'hard',
    title: 'Custom Data Structure',
    description: 'Advanced data structure implementation',
    code: `from collections.abc import MutableMapping
import weakref

class LRUCache(MutableMapping):
    def __init__(self, maxsize=128):
        self.maxsize = maxsize
        self.data = {}
        self.access_order = []
    
    def __getitem__(self, key):
        if key not in self.data:
            raise KeyError(key)
        
        # Move to end (most recently used)
        self.access_order.remove(key)
        self.access_order.append(key)
        return self.data[key]
    
    def __setitem__(self, key, value):
        if key in self.data:
            # Update existing key
            self.access_order.remove(key)
        elif len(self.data) >= self.maxsize:
            # Remove least recently used
            lru_key = self.access_order.pop(0)
            del self.data[lru_key]
        
        self.data[key] = value
        self.access_order.append(key)
    
    def __delitem__(self, key):
        if key not in self.data:
            raise KeyError(key)
        del self.data[key]
        self.access_order.remove(key)
    
    def __iter__(self):
        return iter(self.data)
    
    def __len__(self):
        return len(self.data)

class ObservableDict(dict):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._observers = weakref.WeakSet()
    
    def add_observer(self, observer):
        self._observers.add(observer)
    
    def remove_observer(self, observer):
        self._observers.discard(observer)
    
    def _notify_observers(self, event, key, value=None):
        for observer in self._observers:
            observer.notify(event, key, value)
    
    def __setitem__(self, key, value):
        old_value = self.get(key)
        super().__setitem__(key, value)
        event = 'update' if old_value is not None else 'add'
        self._notify_observers(event, key, value)
    
    def __delitem__(self, key):
        value = self[key]
        super().__delitem__(key)
        self._notify_observers('delete', key, value)

class DictObserver:
    def __init__(self, name):
        self.name = name
    
    def notify(self, event, key, value):
        print(f"{self.name}: {event} - {key} = {value}")

# Usage examples
cache = LRUCache(maxsize=3)
cache['a'] = 1
cache['b'] = 2
cache['c'] = 3
cache['d'] = 4  # This will evict 'a'

print(f"Cache contents: {dict(cache)}")

observable = ObservableDict({'x': 1})
observer1 = DictObserver("Observer1")
observer2 = DictObserver("Observer2")

observable.add_observer(observer1)
observable.add_observer(observer2)

observable['y'] = 2
observable['x'] = 10
del observable['y']`,
    created_at: new Date().toISOString()
  }
];