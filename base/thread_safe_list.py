import threading


class ThreadSafeList:
    def __init__(self):
        self.list = []
        self.lock = threading.Lock()

    def append(self, item):
        with self.lock:
            self.list.append(item)

    def get(self, index):
        with self.lock:
            return self.list[index]

    def get_list(self):
        with self.lock:
            return self.list

    def remove(self, item):
        with self.lock:
            self.list.remove(item)

    def __len__(self):
        with self.lock:
            return len(self.list)

    def __str__(self):
        with self.lock:
            return str(self.list)
