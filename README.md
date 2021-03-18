chat
This chat app is a React Native application built using Expo's gifted-chat and Google Firebase to create a chat app that runs in real-time, for Android and iOS.

Getting Started
Installing Expo
Before the app can run, the Expo CLI must be installed via the terminal with the following command:

npm install expo-cli --global

The Expo app will also need to be downloaded on the user's mobile device to allow the app to run using Expo.

Expo Setup
The user must create an Expo account. This can be done by navigating to the Expo sign-up page and following the steps outlined to create an account. Once finished, the user should be able to log in to Expo on their mobile device and in their browser. These credentials will also be used to log in to the Expo CLI during setup.

iOS Simulator Setup
User will need a product that runs on iOS in order to run this app in an iOS simulator. On a device running iOS, such as a MacBook, the user must install Xcode. Once installed, the user will open it and navigate to "Preferences". Under "Preferences", the user will click on "Components" and install their choice of simulator from the list. Once installed, the user will open the simulator, start their Expo project, and run the project. Projects can be run either by typing "i" in the Expo CLI or clicking "Run on iOS simmulator" in Xcode. Personally, I do not own a MacBook so I did not undertake these steps.

Android Emulator Setup
To set up an emulator for Android, users must download and install Android Studio. The user will be guided through an installation process once the download completes. Do not uncheck the option for "Android Virtual Device" when it shows up during installation.

Once installed, the user should open Android Studio and click the "Configure" option. From there, navigate to Settings --> Appearance and Behavior --> System Setitngs --> Android SDK. Then click on "SDK Tools" and check whether or not "Android SDK Build Tools" are installed. If not, click on the row labelled "Android SDK Build Tools" and download the latest version using the download symbol next to it.

MacOS and Linux users: If a user is on MacOS or Linux, they will need to add the location of the Android SDK to their PATH. In order to accomplish this, copy the path (displayed in the text field at the top of their screens in Android Studio) and add the following to their "/.bashrc" file:

export ANDROID_SDK=/Users/myuser/Library/Android/sdk

Be sure to replace 'myuser' and 'Library' with your information.

MacOS users only: Users with a MacOS will also need to add platform tools to their "/.bashrc" file. The line for this is as follows:

export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH

Once again, make sure to insert your information into the path.

Installing and Running Android Emulator
At this point, the user will close out of the "Settings for New Projects" window and click "Configure" again. This time, the user will select the "AVD Manager" option instead. From there, click "Create Virtual Device" and select a device from the list. Click "Next" to navigate to the "System Image" interface and click on the "Recommended" tab. Finally, select an operating system. For those running Windows, it is advisable to select a device with the Play Store included.

Click the "Download" link next to whichever OS you choose, and Android Studio will download the image. This may take a few minutes. Once finished, in the next window, give your device a name and click "Finish".

Finally, return to the Virtual Device Manager and click on the "Play" icon to start the emulator. Then, navigate to the "Browser" tab of the project you are currently running in Expo and click "Run on Android device/emulator". Expo will begin installing the Expo client on the virtual device and then start the project.

Firebase Setup
First, navigate to Google Firebase and click "Sign In" in the top-right corner. The user should use their existing Google credentials to sign in and create a new Firebase account. If you do not have a Google account, create one and then proceed.

After that, click on the "Go to Console" link in the top-right corner and click "Create Project". If you have created any Firebase projects in the past, it will say "Add Project". The user will then fill out a form with some basic information about themselves. Go ahead and user the default settings on the last step.

Firebase Database Setup
Onnce the project is created, click on the "Database" option in the left panel. From there, click on "Create Database" and select the "Start in Test Mode" option. This option allows users to read from and write to the user's database. Select a database location that is closest to your geographical location.

Firebase Cloud Storage Setuo
The user will need to set up Firebase Cloud Storage to store any images they send and receive. To do so, click the "Storage" option on the left panel, click "Get Started", "Next", and then "Done".

Firebase Authentication Setup
Users will need to be authenticated if they want to utilize the application's ability to send and store messages. To set this up, return to the dashboard and click the "Authentication" option on the left hand panel. Then click "Setup Sign-In Method" and enable the "Anonymous" option, which should be the final item on the list.

Generating an API Key
To give the application access to the user's Firebase project, they must generate an API key. To do so, go to "Project Settings" at the top of the left panel and click "Create Web App" under the "General" tab. This option may appear as </>. In the modal that appears, name your applications and click "Register App".

Once registered, you will get a code snippet that looks something like this:

Firebase Snip

Copy everything within the curly braces of the firebaseConfig variable. Once the user has cloned or downloaded this repository, they will navigate to components/Chat.js, go to the following section of code:

const firebaseConfig = {
      apiKey: "AIzaSyD6qy9DhjCJebzsnyrXWsPxjxvsqeTV8dY",
      authDomain: "test-1af5f.firebaseapp.com",
      projectId: "test-1af5f",
      storageBucket: "test-1af5f.appspot.com",
      messagingSenderId: "539093304807",
      appId: "1:539093304807:web:ff05914c4ec39f180ea942",
      measurementId: "G-HR5FEM62H2"
    }
...delete the content within the curly braces, and paste their own unique API key information instead.

Final Steps
Now that all configuration is complete, the user is able to run the application. Navigate to the project directory in the terminal and type (depending on what package manager the user has chosen):

expo start or npm start or yarn start

From there, the user can type "i" in the terminal to run the app in the iOS simulator (if the user is running on a Mac) or "a" to run in the Android emulator. Make sure the Android emulator is already running.

You can also run the app on your personal mobile device:

Android: Open the Expo app on your Android device, navigate to the user icon in the bottom right, and sign in if you haven't already. Then, navigate back to the Projects tab, and scan the QR code that was generated in the terminal and the Metro Bundler in the browser.

iPhone: Keep open the camera app and focus it on the QR code that was generated in the terminal and the Metro Bundler in the browser.

The app will open, the user will enter their name, choose a background color for the chat screen, and begin chatting.