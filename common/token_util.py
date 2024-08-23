import time
import jwt

LOGIN_KEY = "FIJNNNMKKLOPPPPPKJJJHGFQQ"
LOGIN_EXP = 3600 * 24 * 7


def token_check(token):
    jwt.decode(token, LOGIN_KEY, algorithms='HS256')


def make_token():
    now_t = time.time()
    payload = {'exp': now_t + LOGIN_EXP}
    token = jwt.encode(payload, LOGIN_KEY, algorithm='HS256')
    return token


if __name__ == '__main__':
    token = make_token()
    print(LOGIN_EXP)
    token_check(token)
