# WedSpot

Backend API for WedSpot App, final project for Glints Academy Coding Bootcamp

An app for couples to find the perfect vendor for their dream wedding.

## Technologies
* Javascript
* Node JS
* Express JS
* MongoDB | Mongoose
* Cloudinary
* Axios
* Firebase
* Passport JS

## Important Links
* [API Documentation](https://documenter.getpostman.com/view/14556972/TzzEoEa4)
* [API Link](https://wedspot.gabatch13.my.id/packages)
* [User Web](https://wedspot.netlify.app/)
* [Vendor Web](https://wedspot-admin.netlify.app/)
* [Mobile APK](https://drive.google.com/file/d/10jMuhmpSJDm-M9RHzxEyVVz1t9DEfix1/view)

## Features
### User Features
#### Packages and Vendors
* Visitors and Users can see lists of published packages and vendors with pagination
* Visitors and Users can filter and sort lists of packages and vendors based off queries such as but not limited to price, capacity, location, type, etc

#### Request and Quotation
* User can request a quotation for a package
* User can see their lists of requests and quotations in their profile

#### User Profile
* User can see their profile
* User can edit their info and upload their profile pictures, hosted in Cloudinary.

#### Notifications
* When a user requests a quotation, the user will receive a real time notification to their device. This is implemented with Firebase Cloud Messaging. **Only available in mobile app for now**
* When a user receives a response back from the vendor containing a quotaion, the user will receive a real time notification to their device. **Only available in mobile app for now**
* Users can their list of notifications in their profile.

#### ToDoList
* User can view, create, update, and delete their ToDoList
* User can set a due date for their ToDo, and WedSpot will automatically return remaining days to due date.

#### Google OAuth
* User can login with their google account. **Only available in mobile app for now**

### Vendor Feature
#### Vendor Profile
* Vendor can update their profile
* Which can be filtered and sorted according to user preferences
* Vendor can upload their header and avatar, which will be hosted in Cloudinary

#### Packages
* Vendor can read, create, update, and delete a package
* Vendor can change a package's status from published to unpublished
* Vendor can upload multiple images at once when creating or editing packages
* Vendor can see all of their own paginated packages, published and unpublished in the profile.
* Vendor can filter and sort when querying for their own packages.

#### Request and Quotation
* Vendor can see all requests that were made for their packages.
* Vendor can response to requests by sending a quotation file.

#### Notifications
* When a user request a quotation to a package owned by a vendor, that vendor will receive a real time notification. **Not implemented in vendor web yet**
* Vendor can see all of their notifications in their profile
