import requests
import json
import time

BASE_URL = "http://localhost:3001/api"
ADMIN_EMAIL = "admin@eduwoy.com"
ADMIN_PASSWORD = "Admin@2026!"

def test_inquiry_flow():
    print("Starting Contact Form API Verification...")
    
    # 1. Create a test inquiry (Public)
    inquiry_data = {
        "name": "Integration Test Bot",
        "email": "bot@test.com",
        "subject": "API Integration Test",
        "message": "This is a message from the python verification script."
    }
    
    print("\n1. Creating test inquiry...")
    res = requests.post(f"{BASE_URL}/inquiries", json=inquiry_data)
    if res.status_code == 201:
        print("OK: Inquiry created successfully")
        inquiry_id = res.json()['data']['_id']
    else:
        print(f"FAIL: Failed to create inquiry: {res.status_code} {res.text}")
        return

    # 2. Login as Admin
    print("\n2. Logging in as Admin...")
    login_data = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    res = requests.post("http://localhost:3001/auth/login", json=login_data)
    if res.status_code == 200:
        token = res.json()['accessToken']
        print("OK: Logged in successfully")
    else:
        print(f"FAIL: Login failed: {res.status_code} {res.text}")
        return

    # 3. Get inquiries (Protected)
    print("\n3. Fetching inquiries list...")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/inquiries", headers=headers)
    if res.status_code == 200:
        inquiries = res.json()['data']
        found = any(i['_id'] == inquiry_id for i in inquiries)
        if found:
            print(f"OK: Found test inquiry {inquiry_id} in list")
        else:
            print(f"FAIL: Test inquiry not found in list")
    else:
        print(f"FAIL: Failed to fetch inquiries: {res.status_code} {res.text}")

    # 4. Update inquiry status (Protected)
    print(f"\n4. Updating inquiry {inquiry_id} status to 'resolved'...")
    res = requests.patch(f"{BASE_URL}/inquiries/{inquiry_id}/status", 
                         json={"status": "resolved"}, 
                         headers=headers)
    if res.status_code == 200:
        print("OK: Status updated successfully")
        if res.json()['data']['status'] == 'resolved':
            print("OK: Verified status is now 'resolved'")
        else:
            print(f"FAIL: Status update mismatch: {res.json()['data']['status']}")
    else:
        print(f"FAIL: Failed to update status: {res.status_code} {res.text}")

    print("\nVerification complete!")

if __name__ == "__main__":
    test_inquiry_flow()
