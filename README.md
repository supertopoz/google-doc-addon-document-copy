# google-doc-addon-document-copy AKA Reminder-App
App TAs use for producing the Reminder

![capture](https://user-images.githubusercontent.com/13721960/35959864-bd0ec894-0cea-11e8-8957-8b50f3da03c2.PNG)


# Purpose
* To provide an add-on to Google docs for TAs to complete their reminders. Two tool run once the reminder documents are created. 
* The tool is a Google document addon which picks up data from several sources and copies that data into a new document (AKA Reminder). 


# Life cycle

- Reminder documents are created automatically in Moodle when a class first begins. 








- A [ Microservice ](https://github.com/ilavietnam/Constantly-Iterate-All-Reminder-to-collect-changes) files itterator  constantly checks for edits in the users documents and records them for analytics purposes.
- A [Mircoservice ](https://github.com/ilavietnam/Post-reminder-creation-processing) adds meta data to user documents after creation to register the reminder in Firebase and attach meta data. 


## Usage and data flow

![capture](https://user-images.githubusercontent.com/13721960/35958173-ba963b86-0ce2-11e8-8ccc-cf2e7db4eb1b.PNG)



## Getting Started

- Owner: jason@ilavietnam.edu.vn
- [Master code](https://docs.google.com/document/d/1iee7epzXUAghX8wYkbrc-e9EA6xUv8u7ECebLeBfRAU/edit);
- [Progress check branch code](https://docs.google.com/document/d/1yiWbS6Gxf2UHTcmH8qfDuXmWC9oF2-S3imuqKetvayE/edit)
- [Optimizing Branch](https://docs.google.com/document/d/1-C8Rx0SPmhe0v5pVOcULKqVltQEDuZ3adDIR0zYlVkg/edit)
- Associated Documents: 
- [Master data folder](https://drive.google.com/drive/u/0/folders/0B5miykSsL-gYdlpqS0k4UWwzTW8) - Contains tag reference data and progress certificate data.


### Prerequisites

[Add Google appscript Github assistant tool to chrome.](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=en)


### Installing

1) Fork code. 
2) Install chrome addon. 
3) Sign in using Github account
4) Pull down fork. 
5) Do some work.
6) Push new work back to fork. 
7) Make a pull request when wanting to add to mast branch. 

## Running the tests

Comming soon.

## Deployment

Only mast branch code should be deployed to ILA's internal app store. 
Deployment requires an admin account and to be carried out from root deployment document or appscript. 


## Built With

Javascript 
JQuery

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Jason Allshorn** - *Initial work* - [Supertopoz](https://github.com/Supertopoz)

## License

This project strictly belongs to ILA Vietnam


