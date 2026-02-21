from core import db
from uuid import uuid4
from datetime import datetime
def get_uuid():
    return uuid4().hex
class User(db.Model):
    id = db.Column(db.String(32),primary_key=True,default=get_uuid)
    username = db.Column(db.String(32),nullable=False)
    email = db.Column(db.String(32),nullable=False)
    password = db.Column(db.String(32),nullable=False)
    created_at=db.Column(db.DateTime,default=datetime.utcnow)
    person = db.relationship('Person',backref='user',lazy=True)
    book = db.relationship('Book',backref='user',lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat()
        }



class Gender(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    name = db.Column(db.String(32), nullable=False)
    books = db.relationship('Book', backref='gender', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {"id": self.id, "name": self.name}
class Year(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    name = db.Column(db.String(32), nullable=False)
    books = db.relationship('Book', backref='year', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {"id": self.id, "name": self.name}
class Book(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    gender_id = db.Column(db.String(32), db.ForeignKey('gender.id'), nullable=False)
    year_id = db.Column(db.String(32), db.ForeignKey('year.id'), nullable=False)
    pages = db.Column(db.Integer, nullable=False) 
    img = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "gender_id": self.gender_id,
            "gender_name":self.gender.name,
            "year_id": self.year_id,
            "pages": self.pages,
            "img": self.img,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id
        }
class Country(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    name = db.Column(db.String(32), nullable=False)
    persons = db.relationship('Person', backref='country', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {"id": self.id, "name": self.name}
class Person(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    street_address= db.Column(db.String(100), nullable=False)
    city= db.Column(db.String(100), nullable=False)
    post_code= db.Column(db.String(100), nullable=False)
    country_id = db.Column(db.String(32), db.ForeignKey('country.id'), nullable=False)
    img = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "street_address": self.street_address,
            "city": self.city,
            "post_code": self.post_code,
            "country_id": self.country_id,
            "country_name":self.country.name,
            "img": self.img,
            "user_id": self.user_id
        }
class Borrow(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)

    book_id = db.Column(db.String(32), db.ForeignKey('book.id'), nullable=False)
    person_id = db.Column(db.String(32), db.ForeignKey('person.id'), nullable=False)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)

    borrow_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)  
    return_date = db.Column(db.DateTime, nullable=True)  

    book = db.relationship('Book', backref='borrows', lazy=True)
    person = db.relationship('Person', backref='borrows', lazy=True)
    user = db.relationship('User', backref='borrows', lazy=True)

    def to_dict(self):
        return {
        "id": self.id,
        "book_id": self.book_id,
        "book_title": self.book.title if self.book else None,
        "person_id": self.person_id,
        "person_name": f"{self.person.first_name} {self.person.last_name}" if self.person else None,
        "borrow_date": self.borrow_date.isoformat(),
        "due_date": self.due_date.isoformat(),
        "return_date": self.return_date.isoformat() if self.return_date else None
    }