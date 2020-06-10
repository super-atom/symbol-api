{
	"info": {
		"_postman_id": "b1ad5d8d-639e-4df0-b75a-fd0c8515bdc2",
		"name": "symbol",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "createUser",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"user_login_id\": \"tester1\",\n\t\"user_email\": \"sample1@gmail.com\",\n\t\"user_password\": \"123456\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/users",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "getUser",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/users/9dc16640-a5fb-43e8-ae6c-3d370ba95d1b",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"users",
						"9dc16640-a5fb-43e8-ae6c-3d370ba95d1b"
					]
				}
			},
			"response": []
		},
		{
			"name": "getUsers",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/users/",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"users",
						""
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}