Hipmob Titanium Test App
========================

A simple test app that shows how to integrate the Hipmob Titanium chat module into a Titanium application. See the Hipmob Titanium module at https://marketplace.appcelerator.com/apps/4337 for more information about how Hipmob lets you quickly and easily add fully-featured text, picture and voice messaging to your Titanium-based Android app.

## Installation

Download the latest version of the Hipmob Titanium test application:

    git clone https://github.com/Hipmob/hipmob-titanium-test.git hipmob-titanium-test

Copy the latest version of the Hipmob module from https://marketplace.appcelerator.com/apps/4337 into the hipmob-titanium-test folder.

If you haven't already done so, create a free account at https://manage.hipmob.com/: when you create an account a Hipmob application will be created for you. Log into your Hipmob account and copy the application ID.

Import the project into Titanium Studio, then edit the Resources/ui/common/SupportChat.js file and insert the application ID from your Hipmob account into the appropriate place (marked with the text <insert your own Hipmob app id here>).

Build the project, and then run it.
