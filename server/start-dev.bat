@echo off
REM Start MongoDB in a new window
start "MongoDB" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "D:\data\db"
REM Wait 3 seconds for MongoDB to start
ping 127.0.0.1 -n 4 > nul
REM Start backend
npm run dev 