import os, sys

if sys.version_info[0] < 3:
	import SimpleHTTPServer
	import SocketServer
else:
	import http.server as SimpleHTTPServer
	import socketserver as SocketServer

class CustomHTTPHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
	def do_GET(self):
		filepath = self.path

		if os.path.exists(self.translate_path("/pages" + filepath + ".html")):
			self.path = "/pages" + filepath + ".html"

			self.send_response(404)
			f = self.send_head()
			if f:
				self.copyfile(f, self.wfile)
				f.close()
		else:
			f = self.send_head()
			if f:
				self.copyfile(f, self.wfile)
				f.close()

handler = CustomHTTPHandler
httpd = SocketServer.TCPServer(("", 8080), handler)

print("Serving at port 8080")
httpd.serve_forever()
