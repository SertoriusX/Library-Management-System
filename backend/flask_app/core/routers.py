import os
from werkzeug.utils import secure_filename
from core import app,db,bcrypt
from flask import send_from_directory,current_app,request,jsonify
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity,get_jwt
from .models import User,Gender,Year,Book,Borrow,Person,Country
from datetime import datetime
from datetime import timedelta

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


def save_image(image_file):
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    os.makedirs(upload_folder, exist_ok=True)  

    filename = secure_filename(image_file.filename)
    filepath = os.path.join(upload_folder, filename)
    image_file.save(filepath)
    return filename


#-------------------Register----------------------------#
@app.route('/register',methods=['POST'])
def register():
    data =request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hast_password= bcrypt.generate_password_hash(password).decode('utf-8')
    if not username and not email:
        return jsonify({'msg':'This fields is required'})
    if User.query.filter_by(username=username).first():
        return jsonify({'msg':'This username is already exists'})
    if User.query.filter_by(email=email).first():
        return jsonify({'msg':'This email is already exists'})
    new_user = User(username=username,email=email,password=hast_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict())

#-------------------Login----------------------------#
@app.route('/login',methods=['POST'])
def login():
    data =request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if not user and not bcrypt.check_password_hash(user.password,password):
        return jsonify({'msg':'Something wrong with your connection'})
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'user':user.username,
        'access_token':access_token
    })


#-------------------Gender----------------------------#

@app.route('/gender',methods=['GET'])
def get_gender():
    genders = Gender.query.order_by(Gender.id.asc()).all()
    gender_l=[gender.to_dict() for gender in genders]
    return jsonify(gender_l)

@app.route('/gender/<string:id>',methods=['GET'])
def get_by_id_gender(id):
    gender = Gender.query.filter_by(id=id).first()
 
    return jsonify(gender.to_dict())

@app.route('/gender',methods=['POST'])
def create_gender():
    data=request.get_json()
    name= data.get('name')
    new_gender= Gender(name=name)
    db.session.add(new_gender)
    db.session.commit()
    return jsonify(new_gender.to_dict())



@app.route('/gender/<string:id>',methods=['PUT'])
def edit_by_id_gender(id):
    data=request.get_json()
    name= data.get('name')
    gender = Gender.query.filter_by(id=id).first()
    if name :
        gender.name=name
    db.session.commit()
 
    return jsonify(gender.to_dict())

@app.route('/gender/<string:id>',methods=['DELETE'])
def delete_by_id_gender(id):

    gender = Gender.query.filter_by(id=id).first()
    db.session.delete(gender)
    db.session.commit()
 
    return jsonify({'msg':'You delete this gender correctly'})








#-------------------Country----------------------------#

@app.route('/country',methods=['GET'])
def get_country():
    countrys = Country.query.order_by(Country.id.asc()).all()
    country_l=[country.to_dict() for country in countrys]
    return jsonify(country_l)

@app.route('/country/<string:id>',methods=['GET'])
def get_by_id_country(id):
    country = Country.query.filter_by(id=id).first()
 
    return jsonify(country.to_dict())

@app.route('/country',methods=['POST'])
def create_country():
    data=request.get_json()
    name= data.get('name')
    new_country= Country(name=name)
    db.session.add(new_country)
    db.session.commit()
    return jsonify(new_country.to_dict())



@app.route('/country/<string:id>',methods=['PUT'])
def edit_by_id_country(id):
    data=request.get_json()
    name= data.get('name')
    country = Country.query.filter_by(id=id).first()
    if name :
        country.name=name
    db.session.commit()
 
    return jsonify(country.to_dict())

@app.route('/country/<string:id>',methods=['DELETE'])
def delete_by_id_country(id):

    country = Country.query.filter_by(id=id).first()
    db.session.delete(country)
    db.session.commit()
 
    return jsonify({'msg':'You delete this gender correctly'})




#-------------------Year----------------------------#

@app.route('/year', methods=['GET'])
def get_year():
    years = Year.query.order_by(Year.id.asc()).all()
    year_l = [year.to_dict() for year in years]
    return jsonify(year_l)

@app.route('/year/<string:id>',methods=['GET'])
def get_by_id_year(id):
    year = Year.query.filter_by(id=id).first()
 
    return jsonify(year.to_dict())

@app.route('/year',methods=['POST'])
def create_year():
    data=request.get_json()
    name= data.get('name')
    new_year= Year(name=name)
    db.session.add(new_year)
    db.session.commit()
    return jsonify(new_year.to_dict())



@app.route('/year/<string:id>',methods=['PUT'])
def edit_by_id_year(id):
    data=request.get_json()
    name= data.get('name')
    year = Year.query.filter_by(id=id).first()
    if name :
        year.name=name
    db.session.commit()
 
    return jsonify(year.to_dict())

@app.route('/year/<string:id>',methods=['DELETE'])
def delete_by_id_year(id):

    year = Year.query.filter_by(id=id).first()
    db.session.delete(year)
    db.session.commit()
 
    return jsonify({'msg':'You delete this year correctly'})


#-------------------Book----------------------------#



@app.route('/book',methods=['GET'])
def get_book():
    books = Book.query.order_by(Book.id.asc()).all()
    book_list = [book.to_dict() for book in books]
    return jsonify(book_list)

@app.route('/book/<string:id>',methods=['GET'])
def get_by_id_book(id):
    book= Book.query.filter_by(id=id).first()
    return jsonify(book.to_dict())


@app.route('/book',methods=['POST'])
@jwt_required()
def create_book():
    current_user=get_jwt_identity()
    title= request.form.get('title')
    author= request.form.get('author')
    gender_id= request.form.get('gender_id')
    year_id= request.form.get('year_id')
    pages= request.form.get('pages')
    img= request.files.get('img')
    f_c=save_image(img)
    new_book=Book(title=title,author=author,gender_id=gender_id,year_id=year_id,pages=pages,img=f_c,user_id=current_user)
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict())

@app.route('/book/<string:id>',methods=['PUT'])
def edit_book(id):
    book=Book.query.filter_by(id=id).first()
    if  request.form.get('title'):
        book.title= request.form.get('title')
    if  request.form.get('author'):
        book.author= request.form.get('author')
    if  request.form.get('gender_id'):
        book.gender_id= request.form.get('gender_id')
    if  request.form.get('year_id'):
        book.year_id= request.form.get('year_id')
    if  request.form.get('pages'):
        book.pages= request.form.get('pages')
    if  request.form.get('img'):
        book.img= save_image(request.files.get('img'))
    db.session.commit()
    return jsonify(book.to_dict())

@app.route('/book/<string:id>',methods=['DELETE'])
def delete_book(id):
    book=Book.query.filter_by(id=id).first()
    db.session.delete(book)
    db.session.commit()
    return jsonify({'msg':'Was delete successfully this book'})



#-------------------Person----------------------------#
@app.route('/person',methods=['GET'])
def get_person():
    persons = Person.query.order_by(Person.id.asc()).all()
    person_list = [person.to_dict() for person in persons]
    return jsonify(person_list)

@app.route('/person/<string:id>',methods=['GET'])
def get_by_id_person(id):
    person= Person.query.filter_by(id=id).first()
    return jsonify(person.to_dict())
@app.route('/person', methods=['POST'])
@jwt_required()
def create_person():
    current_user = get_jwt_identity()
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    street_address = request.form.get('street_address')
    city = request.form.get('city')
    post_code = request.form.get('post_code')
    country_id = request.form.get('country_id')
    img = request.files.get('img')
    img_s = save_image(img) if img else None

    new_person = Person(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        street_address=street_address,
        city=city,
        post_code=post_code,
        country_id=country_id,
        img=img_s,
        user_id=current_user
    )
    db.session.add(new_person)
    db.session.commit()
    return jsonify(new_person.to_dict()), 201


@app.route('/person/<string:id>', methods=['PUT'])
def edit_person(id):
    person = Person.query.get_or_404(id)  # fixed
    if request.form.get('first_name'):
        person.first_name = request.form.get('first_name')
    if request.form.get('last_name'):
        person.last_name = request.form.get('last_name')
    if request.form.get('email'):
        person.email = request.form.get('email')
    if request.form.get('phone'):
        person.phone = request.form.get('phone')
    if request.form.get('street_address'):
        person.street_address = request.form.get('street_address')
    if request.form.get('city'):
        person.city = request.form.get('city')
    if request.form.get('post_code'):
        person.post_code = request.form.get('post_code')
    if request.form.get('country_id'):
        person.country_id = request.form.get('country_id')
    if 'img' in request.files:
        person.img = save_image(request.files.get('img'))

    db.session.commit()
    return jsonify(person.to_dict()), 200

@app.route('/person/<string:id>',methods=['DELETE'])
def delete_person(id):
    person= Person.query.filter_by(id=id).first()
    db.session.delete(person)
    db.session.commit()
    return jsonify({'msg':'You delete successfully this person'})





@app.route('/borrow', methods=['POST'])
@jwt_required()
def create_borrow():
    current_user = get_jwt_identity()
    data = request.get_json()

    book_id = data.get("book_id")
    person_id = data.get("person_id")
    due_date_str = data.get("due_date")

    if not book_id or not person_id:
        return jsonify({"error": "book_id and person_id are required"}), 400

    borrow_date = datetime.utcnow()
    due_date = datetime.fromisoformat(due_date_str) if due_date_str else borrow_date + timedelta(days=14)

    borrow = Borrow(
        book_id=book_id,
        person_id=person_id,
        user_id=current_user,
        borrow_date=borrow_date,
        due_date=due_date
    )
    db.session.add(borrow)
    db.session.commit()

    return jsonify(borrow.to_dict()), 201




@app.route('/borrow', methods=['GET'])
@jwt_required()
def get_borrows():
    current_user = get_jwt_identity()
    borrows = Borrow.query.filter_by(user_id=current_user).all()
    return jsonify([b.to_dict() for b in borrows]), 200


@app.route('/borrow/<borrow_id>', methods=['GET'])
@jwt_required()
def get_borrow(borrow_id):
    borrow = Borrow.query.get_or_404(borrow_id)
    return jsonify(borrow.to_dict()), 200


@app.route('/borrow/<borrow_id>/return', methods=['PUT'])
@jwt_required()
def return_book(borrow_id):
    borrow = Borrow.query.get_or_404(borrow_id)
    return_date_str = request.json.get("return_date") if request.is_json else None
    borrow.return_date = datetime.fromisoformat(return_date_str) if return_date_str else datetime.utcnow()

    db.session.commit()
    return jsonify(borrow.to_dict()), 200


@app.route('/borrow/<borrow_id>', methods=['DELETE'])
@jwt_required()
def delete_borrow(borrow_id):
    borrow = Borrow.query.get_or_404(borrow_id)
    db.session.delete(borrow)
    db.session.commit()
    return jsonify({"message": "Borrow deleted"}), 200