from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Static car data
CARS_DATA = [
    {
        "id": "1",
        "name": "Lamborghini Huracán EVO",
        "brand": "Lamborghini",
        "price": 261274,
        "year": 2024,
        "horsepower": 631,
        "acceleration": "2.9s",
        "top_speed": "325 km/h",
        "engine": "5.2L V10",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1767907571229-01cf4ba03590?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1767907571229-01cf4ba03590?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1636879577841-529c0e23a9af?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["Carbon Ceramic Brakes", "Alcantara Interior", "Sport Exhaust", "Rear Camera", "Navigation System", "Leather Seats"],
        "description": "The Huracán EVO represents the natural evolution of the most successful V10-powered Lamborghini ever."
    },
    {
        "id": "2",
        "name": "Ferrari 488 GTB",
        "brand": "Ferrari",
        "price": 330000,
        "year": 2024,
        "horsepower": 661,
        "acceleration": "3.0s",
        "top_speed": "330 km/h",
        "engine": "3.9L V8 Twin-Turbo",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1678126631010-492fcff469dd?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1678126631010-492fcff469dd?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1648596811810-56bdc2a4222c?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["Carbon Fiber Package", "Racing Seats", "Sport Exhaust", "Parking Sensors", "Premium Sound", "Adaptive Suspension"],
        "description": "The Ferrari 488 GTB represents a quantum leap in the development of the mid-rear-engined sports car."
    },
    {
        "id": "3",
        "name": "Porsche 911 Turbo S",
        "brand": "Porsche",
        "price": 230600,
        "year": 2024,
        "horsepower": 640,
        "acceleration": "2.6s",
        "top_speed": "330 km/h",
        "engine": "3.8L Flat-6 Twin-Turbo",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1704325053114-1b9750ca7bec?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1704325053114-1b9750ca7bec?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["PCCB Brakes", "Sport Chrono Package", "Bose Sound System", "Adaptive Cruise", "Matrix LED", "Sport Seats Plus"],
        "description": "The 911 Turbo S continues the legacy of being the ultimate everyday supercar with unmatched performance."
    },
    {
        "id": "4",
        "name": "BMW M4 Competition",
        "brand": "BMW",
        "price": 84900,
        "year": 2024,
        "horsepower": 503,
        "acceleration": "3.8s",
        "top_speed": "290 km/h",
        "engine": "3.0L I6 Twin-Turbo",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["M Carbon Bucket Seats", "Harman Kardon", "M Drive Professional", "Head-Up Display", "Parking Assistant", "M Sport Differential"],
        "description": "The BMW M4 Competition combines everyday usability with track-ready performance."
    },
    {
        "id": "5",
        "name": "Mercedes-AMG GT R",
        "brand": "Mercedes",
        "price": 187000,
        "year": 2024,
        "horsepower": 577,
        "acceleration": "3.5s",
        "top_speed": "318 km/h",
        "engine": "4.0L V8 Biturbo",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1762195347699-a842c3dd15e7?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1762195347699-a842c3dd15e7?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["AMG Track Pace", "Carbon Fiber Roof", "AMG Performance Exhaust", "Burmester Sound", "Active Aero", "Race Mode"],
        "description": "Born on the racetrack, the AMG GT R is the pinnacle of Mercedes-AMG engineering excellence."
    },
    {
        "id": "6",
        "name": "Ferrari F8 Tributo",
        "brand": "Ferrari",
        "price": 276550,
        "year": 2024,
        "horsepower": 710,
        "acceleration": "2.9s",
        "top_speed": "340 km/h",
        "engine": "3.9L V8 Twin-Turbo",
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "image": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?crop=entropy&cs=srgb&fm=jpg&q=85",
        "gallery": [
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?crop=entropy&cs=srgb&fm=jpg&q=85",
            "https://images.unsplash.com/photo-1678126631010-492fcff469dd?crop=entropy&cs=srgb&fm=jpg&q=85"
        ],
        "features": ["Carbon Fiber Exterior", "Full Electric Seats", "JBL Premium Audio", "Front Lift System", "Racing Stripes", "Scuderia Shields"],
        "description": "The F8 Tributo is the most powerful V8 Ferrari ever made, a tribute to the most successful engine in the marque's history."
    }
]

# Models
class TestDriveBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    car_id: str
    car_name: str
    preferred_date: str
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestDriveCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    car_id: str
    car_name: str
    preferred_date: str
    message: Optional[str] = ""

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str

class Car(BaseModel):
    id: str
    name: str
    brand: str
    price: int
    year: int
    horsepower: int
    acceleration: str
    top_speed: str
    engine: str
    fuel_type: str
    transmission: str
    image: str
    gallery: List[str]
    features: List[str]
    description: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Velocity Motors API"}

@api_router.get("/cars", response_model=List[Car])
async def get_cars(
    brand: Optional[str] = None,
    fuel_type: Optional[str] = None,
    transmission: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None
):
    cars = CARS_DATA.copy()
    
    if brand:
        cars = [c for c in cars if c["brand"].lower() == brand.lower()]
    if fuel_type:
        cars = [c for c in cars if c["fuel_type"].lower() == fuel_type.lower()]
    if transmission:
        cars = [c for c in cars if c["transmission"].lower() == transmission.lower()]
    if min_price:
        cars = [c for c in cars if c["price"] >= min_price]
    if max_price:
        cars = [c for c in cars if c["price"] <= max_price]
    
    return cars

@api_router.get("/cars/{car_id}", response_model=Car)
async def get_car(car_id: str):
    car = next((c for c in CARS_DATA if c["id"] == car_id), None)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@api_router.get("/brands")
async def get_brands():
    brands = list(set(c["brand"] for c in CARS_DATA))
    return {"brands": sorted(brands)}

@api_router.post("/test-drive", response_model=TestDriveBooking)
async def create_test_drive(booking: TestDriveCreate):
    booking_obj = TestDriveBooking(**booking.model_dump())
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.test_drive_bookings.insert_one(doc)
    return booking_obj

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterCreate):
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": subscription.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    sub_obj = NewsletterSubscription(**subscription.model_dump())
    doc = sub_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.newsletter_subscriptions.insert_one(doc)
    return sub_obj

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(contact: ContactCreate):
    contact_obj = ContactMessage(**contact.model_dump())
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return contact_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


