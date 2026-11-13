"""Serve the local experience with consistent ES module MIME types on Windows."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import webbrowser

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".mjs": "text/javascript", ".js": "text/javascript"}

if __name__ == "__main__":
    root = Path(__file__).resolve().parents[2]
    with ThreadingHTTPServer(("127.0.0.1", 0), partial(Handler, directory=str(root))) as server:
        url = f"http://127.0.0.1:{server.server_port}/experience/?localEngine"
        print(url, flush=True)
        webbrowser.open(url)
        server.serve_forever()
