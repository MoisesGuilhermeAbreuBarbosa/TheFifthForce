from pathlib import Path
from qagra.cli import main
if __name__ == "__main__":
    raise SystemExit(main(["demo", "--output-dir", str(Path("runs") / "demo")]))
