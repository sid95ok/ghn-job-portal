DB_URI=$1
JWT_SECRET=$2

echo "DB_URI = $DB_URI" >> .env
echo "JWT_SECRET = $JWT_SECRET" >> .env
echo "REACT_APP_BASEURL = http://localhost:8080/api/v1" >> ./ui/.env

npm install
npm install --prefix ./ui/
npm run dev
