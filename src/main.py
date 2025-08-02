"""
The CLI entry point. Uses argparse to handle user input and
orchestrates the overall workflow.
"""

import argparse
from .file_handler import read_file, write_to_file
from .recursive_improver import RecursiveImprover


def main():
    """Main function to run the CLI tool."""
    parser = argparse.ArgumentParser(
        description="A CLI tool to generate and improve code using small LLMs."
    )
    parser.add_argument(
        "--prompt", required=True, help="The high-level prompt for the task."
    )
    parser.add_argument(
        "--file", help="Path to an existing file to improve."
    )
    parser.add_argument(
        "--output-file", help="Path to save the generated code."
    )
    args = parser.parse_args()

    file_content = ""
    if args.file:
        file_content = read_file(args.file)

    improver = RecursiveImprover()
    final_code = improver.run(user_prompt=args.prompt, file_content=file_content)

    if args.output_file:
        write_to_file(args.output_file, final_code)
        print(f"\nCode saved to {args.output_file}")
    else:
        print(f"\n--- Generated Code ---\n{final_code}")


if __name__ == "__main__":
    main()
