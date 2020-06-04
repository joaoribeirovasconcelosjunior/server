BASEURL="http://localhost:3000"
echo "ROTA LOGIN"

curl -POST $BASEURL/login \
  -H 'Content-Type: application/json' \
  -d '{ "email": "pedro@gmail.com", "password": "12345" }'
echo ""
