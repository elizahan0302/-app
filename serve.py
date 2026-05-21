from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


PORT = 4173


class H5Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    root = Path(__file__).resolve().parent
    H5Handler.directory = str(root)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), H5Handler)
    print(f"咩咩 H5 已启动：http://127.0.0.1:{PORT}")
    print("按 Ctrl+C 关闭。")
    server.serve_forever()


if __name__ == "__main__":
    main()
