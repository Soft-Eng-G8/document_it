


# Running the app
After either cloning the repository or downloading the code, go to this directory and run
`npm i --force' (--force is necessary here)
Once done, you may run the project with `npm run dev`

# Usage
`npm run dev` will let you access the site. You may create a new account but it will not have adminstrative powers. The database already contains such an account.
Use this admin account:
```
username: Saluso_V
password: reel_bomba
```
You'll see that you have adminstrative powers when you see the `Dashboard` tab on your navbar 


# Checking database
to check the database, you can either use an sqlite db reader and go to `/prisma/dev.db`, or
use prisma studio
for the latter, `npx prisma generate` then `npx prisma studio`
