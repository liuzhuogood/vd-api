import socket


def if_none(s, default=""):
    if not s:
        return default
    return s


def find_free_port(start_port=1024, end_port=49151):
    """Find a free port between start_port and end_port."""
    for port in range(start_port, end_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) != 0:
                return port
    raise ValueError(f"No free ports found in range {start_port}-{end_port}")
