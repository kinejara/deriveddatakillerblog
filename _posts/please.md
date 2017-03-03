---
title: Jenkins Pipeline combo and small Fastlane to go please
date: 2017-03-03 01:19:58
tags: swift,xcode,objective-c,ci,jenkins,fastlane
---

Jenkins Pipelines are the new way to handle your CI jobs in Jenkins they do have a lot of cool new features including the ability of keep your configurations over source controlling, Fastlane by fabric is a tool for Mac OS, iOS and Android developers to automate tedious tasks like submitting to hockey, beta or even Testflight.

Configuring a Jenkins Pipeline for your iOS project it's actually really easy.

1. Open Jenkins in your web browser
2. Click in new item
3. Enter an item name
4. Select Pipeline

Once you are done with those steps you will reach the configuration section of your pipeline, you can now start typing your groovy into the script box, you can also grab your pipeline code or Jenkinsfile from your project repo you just need to change the definition source of your pipeline to be a pipeline script from SCM.

This is an example of a simple pipeline script that will build your iOS project, archive an IPA file for you and submit to both platforms Beta and Testflight all by using fastlane.

```
node {
   //includes environment and indicates the language required by cocopods
   env.PATH ='/usr/local/bin:/usr/bin:/bin:/'
   env.LANG='en_US.UTF-8'

   stage('Checkout') {
        // Checkout files.
        checkout([
            $class: 'GitSCM',
            branches: [[name: 'development']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [], submoduleCfg: [],
            userRemoteConfigs: [[
                name: 'yourgithubnamehere',
                url: 'git@urltoaniceiosproject.com'
            ]]
        ])
    }

    stage('Cocopods Install') {
        //update cocopod master repo
        sh "pod repo update"
        try {
          //install pod project dependencies
          sh "pod install"
        } catch(Exception e) {
          //you can trigger a notification here
        }
    }

    stage('Deploy To Beta') {
        try {
          // run the fastlane module to build and deploy to beta
          sh "fastlane beta"
        } catch(Exception e) {
          //trigger a notification here
        }
    }

    stage('Deploy To Testflight') {
      try {
          //run the fastlane module to build and deploy to testfligh
          sh "fastlane testflight"
      } catch(Exception e) {
        //trigger notification here
      }
    }
}
```

Besides of a proper pipeline you are going to need to get fastlane and configure your fastlane file, you will find this process quite easy.
You can get information about how to instale fastlane in your project in the Fastlane oficial website or in the oficial github repo.

this is an example of a basic Fastlane file that you can use

```
# More documentation about how to customize your build
# can be found here:
# https://docs.fastlane.tools
fastlane_version "1.109.0"

# This value helps us track success metrics for Fastfiles
# we automatically generate. Feel free to remove this line
# once you get things running smoothly!
generated_fastfile_id "some-id-goes-here"
default_platform :ios

# Fastfile actions accept additional configuration, but
# don't worry, fastlane will prompt you for required
# info which you can add here later
lane :beta do |values|
  gym(
     scheme: "Project-name-Dev",
     workspace: "/path/to/your/ios/myiosproject.xcworkspace",
     clean: true,
     export_method: 'ad-hoc'
  )

  # upload to Beta by Crashlytics
  emails = values[:test_email] ? values[:test_email] : ['testerOne@gmail.com','testerTwo@gmail.com'] # You can list more emails here

  crashlytics(api_token: 'youcrashlytictokenhere',
           build_secret: 'yourbuildsecretgoeshere',
                 emails: emails,
                  notes: 'Distributed with fastlane', # Check out the changelog_from_git_commits action
          notifications: true) # Should this distribution notify your testers via email?
end

lane :testflight do
  gym(
     scheme: "Project-name-Dev",
     workspace: "/path/to/your/ios/myiosproject.xcworkspace",
     clean: true
  )

  # upload to Testflight
  pilot(skip_waiting_for_build_processing: true,
        username: "itunesconnect@username.com")
end
```

There are for sure a lot of configurations steps that I'm not covering in this post, if this is the first time that you configure Jenkins you are going to need to prepare you provisional profiles but that is a topic for another post.

The point about using Fastlane and Jenkins pipelines is that you are going to save a lot of time by not having to do manual deploys to beta or Testfight.
You can get more information about Fastlane in [here] and you can learn more about Jenkins Pipelines in the ofical [website].

[here]: <https://fabric.io/features/distribution?utm_campaign=fastlane.tools>
[website]: <https://jenkins.io/index.html>



