"""
Utility for reading from and writing to files.
"""

def read_file(file_path: str) -> str:
    """Reads the content of a file and returns it as a string."""
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return ""

def write_to_file(file_path: str, content: str):
    """Writes content to a specified file."""
    with open(file_path, 'w') as f:
        f.write(content)
