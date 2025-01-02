/* Not implemented for:
* lesson
* background
* progressmeter
* popin
* as
* prompt
* muhouse items
* lessonname
* lessonicon
* avatartype
* avatarprogress
* avatarlevels
* api
* screen
* state
* clearingXXX
* asdata
* logdata
* ttsvoice 
* ttsstyle
* ttspitch
* ttstimbre
* playservice
* playurlpath
* playurlquery
* playurlfragment
* customloginlaunch
* customlogintoken
* customloginsource
* maxconnections
* messaging
* sendmessages
* showfuturemessages
* qoskeystitration
*/

interface ParamsData {
    paramName: string
    description: string
    options: string[]
}

export const paramsData: ParamsData[] = [
    {
        paramName: "iOS",
        description:
            "Used to set the global iOS flag, which enables/disables various engagement/tool functionality",
        options: ["boolean"],
    },
    {
        paramName: "engagement",
        description: "Engagement. With 'none', the default, you will get just a 1024x768 lesson surface. There will be no top or bottom bar, and errors will be reported using browser alerts. You may not want an engagement if you are doing a minimal lesson, such as a component test.",
        options: ["primary", "coolfrost", "paperfrenzy", "none"],
    },
    {
        paramName: "lcid",
        description: "Specifies the locale (1033 for US English or 21514 for US Spanish). From this, we will determine the parameter 'language', which is NORMALLY what we will key off for localization. For example the Canadian English locale, when we support that, will also result in language=english (though we may have a lookaside dictionary to convert e.g. color to colour.). But lcid is the most precise statement of the locale, so this is the only thing we need to specify. The default is 1033.",
        options: ["1033", "21514"],
    },
    {
        paramName: "theme",
        description: "When testing primary-preferred lessons, this parameter influences the choice of assets like backgrounds, progress meters, and themed popins (everyone but Stella, who is an academic popin). By default this 'dinosaurs'.",
        options: ["dinosaurs", "pirates", "pixies", "petfriends"],
    },
    {
        paramName: "story",
        description: "In primary, the story can also be involved in selecting assets like backgrounds.",
        options: ["numeric"],
    },
    {
        paramName: "goal",
        description: "Technically the goal can also be used to select primary assets, but in practice it does not. Just to complete the theme/story/goal set.",
        options: ["numeric"],
    },
    {
        paramName: "loglevel",
        description: "The level of tracing that will appear in the console window and the debug panel trace. By default this is 'info'. In production the value is 'off'. During development, the default of 'info' calls out when most major state changes occur in the runtime, so it represents a good default.",
        options: ["off", "fatal", "error", "warn", "info", "debug"],
    },
    {
        paramName: "alertLevel",
        description: "The level at which we pop up an in-your-face error popup or alert. During development this is warn, by default. During production, this is always 'fatal', but both 'fatal' and 'error' levels are sent to the server.",
        options: ["off", "fatal", "error", "warn", "info", "debug"],
    },
    {
        paramName: "debug",
        description: `The debug flag controls the behavior of the following: Whether any console tracing occurs (debug=false => loglevel = off). Whether ERROR and WARN logging causes an error popup (debug=false => only FATAL shows popup). Whether minified createjs is loaded (debug=false => load minified js). Whether red "interaction shield" shows (debug=false => no translucent red shield when interactive=false). Whether uncaught errors result in a FATAL (with debug=true, we just stop in the javascript debugger). Whether the debug bar appears rather than the copyright bar (debug=false => copyright bar). Whether focusing another window or tab causes an auto-pause. The default debug flag is true for non-minified bits.`,
        options: ["boolean"],
    },
    {
        paramName: "resizible",
        description: "This parameter lets you resize the stage by resizing the window, and is the default behavior in a browser. However we turn it off by default within the IDE. Turning it on is useful for looking at how things scale.",
        options: ["boolean"],
    },
    {
        paramName: "mobile",
        description: "In the IDE, causes DBLCapabilities.hasMouse() to return false even though there actually is a mouse. This lets you verify code that queries hasMouse() to alter some behavior, for example adding a shift to a dragged object so as to make it visible under your finger. There will also not be any rollover events. It also causes a pop-up keyboard to appear for most edit fields.",
        options: ["boolean"],
    },
    {
        paramName: "minspec",
        description: "Allows us to adapt (in a simple, binary way) to the device capabilities. minspec defaults to true on android and iOS, except when running our app on an iPad 4 or higher level device. You can override the setting in your debug url parameters for testing. Behavior differences in the engagement and lessons are logged here.",
        options: ["boolean"]
    },
    {
        paramName: "webview",
        description: "Indicates whether we are running in the webview app, and should therefore not have a copyright bar and not resize. Setting webview=true implies mobile=true. You can use &webview=true when working standalone, in the IDE, in order to fully simulate iPad operation, i.e. no bottom bar. ",
        options: ["boolean"]
    },
    {
        paramName: "clientinstance",
        description: "Passed in as a parameter beginning with v4. Passed back to the server on all server calls in the DBL-ClientInstanceId header.",
        options: ["numeric"]
    },
    {
        paramName: "staticversion",
        description: `If you wonder why all loads end with a number, like ?1234, this is a "cache-clearing" or "magic" number. In production, when we update the files, we also update this number so that all clients append a new static version number to their requests, thereby ensuring that all levels of caching (browser, proxies, etc.) are cleared. During development we ALSO append a static version number, but by default we pick this number at random. This means that you very rarely need to clear your browser cache during development. Normally you do NOT set this parameter, but you can, for cache testing.`,
        options: ["numeric"]
    },
    {
        paramName: "failload",
        description: "The actual cache-clearing string used during development also include a unique load-instance number, so the first load is suffixed with ?1234_1, the second with ?1234_2, etc. This gives you a quick read of how many files were loaded. Also, you can use failload=2 to fail the second load. The load is failed simply by requesting a non-existent file for the file in question, resulting in a 404. This is a great way to do basic load-failure testing.",
        options: ["numeric"]
    },
    {
        paramName: "holdlowtide",
        description: `The "tide" of memory allocation goes in as you start a lesson or screen and then (hopefully) out again when you end it. The "low tide" mark occurs after cleanup of the previous lesson/screen, and before loading begins for the next lesson/screen. At this time you will see any engagement top / bottom bar (the "shell"), a "screenshot" of the previous lesson/screen, with a scrim and spinner. The "holdlowtide" option lets you "hold" this low tide moment so you can go to the Inspector memory tab, hit Garbage Collect, then get a Memory Snapshot. If you still see evidence of your lesson, tools, or screen in that snapshot, then you likely have a memory leak.`,
        options: ["boolean"]
    },
    {
        paramName: "webfonts",
        description: "This parameter makes us NOT load web fonts. This currently simulates IE 10 behavior.",
        options: ["boolean"]
    },
    {
        paramName: "time",
        description: `All requests for the wallclock time go through the getTime() API. This parameter makes this always return 0. In particular, in the AS Data reported in the automation log, it will show that the lesson started at time 0, each problem took 0 time, etc. (You can actually test time parameters explicitly by calling advanceTime(milliseconds) in LessonScript.) This is ALWAYS how lessons run during automation playback. As such you should use this parameter when running a lesson with a view to harvesting the automation log for a test (i.e. for pasting into a .run file).`,
        options: ["stopped"]
    },
    {
        paramName: "shellauto",
        description: `Normally the shell contributes some automation commands to the automation log, e.g. "> click shell at back". This is useful when looking at error logs, etc. However we do not included these in our lesson automation baselines and playback engine. This option suppresses shell automation output, and is automatically added on by the test catalog, similar to time=stopped. The option also extends to "interaction events" emanating from the shell, and recorded in the AS data, for pause and help - normally these are not recorded in our automation runs, because it complicates the process of creating and maintaining baselines.`,
        options: ["boolean"]
    },
    {
        paramName: "seeds",
        description: `Specifies the generator and general-purpose seeds. If you don't specify seeds, these will be computed automatically based on the wallclock time when you launch, just like we do in production, to get a good random sequence of problems and proxy choices. If you want to replicate the exact same sequence then you can specify your own seeds in the URL. Note that a .run file encodes the seeds in the opening new lesson line, which is how we ensure the same results from run to run, even though we use random numbers.`,
        options: ["[123,567]"]
    },
    {
        paramName: "webgl",
        description: "Used to turn on or off webgl capabilities. Use this when testing a webgl-aware component on a browser that does not support webgl. Useful to compare performance.",
        options: ["boolean"]
    },
    {
        paramName: "stall",
        description: "This parameter controls stall behavior. The stall=fast setting makes everything happen 10 times faster, including stalls, engagement timeouts, and server pings, so this is useful for debugging in certain cases. Now (2020), by default, lesson stalls are silent (stall=none), but you can make them audible again with stall=audible.",
        options: ["fast", "none", "audible"]
    },
    {
        paramName: "nanogameselection",
        description: "Does the same as nanogamedoor=true, and also allows you to select which nanogame and variation to play.",
        options: ["boolean"]
    },
    {
        paramName: "nanovariation",
        description: "Sets the variation to use when loading a nanogame.",
        options: ["Easy"]
    },
    {
        paramName: "audio",
        description: "Audio support. Currently defaults to web for iPad and Safari, html for everything else.",
        options: ["none", "html", "web"]
    },
    {
        paramName: "myhouse",
        description: "Show Primary Engagement My House option. Defaults to true. Part of Engagement Locks feature.",
        options: ["boolean"]
    },
    {
        paramName: "arcade",
        description: "Show Primary Engagement Arcade option. Defaults to true. Part of Engagement Locks feature.",
        options: ["boolean"]
    },
    {
        paramName: "collections",
        description: "Show Intermediate Engagement Personalization features. Defaults to true. Part of Engagement Locks feature.",
        options: ["boolean"]
    },
    {
        paramName: "personalization",
        description: "Show Intermediate Engagement Collections features. Defaults to true. Part of Engagement Locks feature.",
        options: ["boolean"]
    },
    {
        paramName: "audiencetype",
        description: `Alters some shell behaviors. 0 means the base student experience - this is the default. 1 means demo/sample lessons - in PE, no coin display, no back button, and exit exits the product. 2 means teacher tools - same behavior as 1 in PE.`,
        options: ["numeric"]
    },
    {
        paramName: "avatar",
        description: `Avatar - passed in from single-page-app html. Defaults in IDE only to boy001.`,
        options: ["boy001", "3001"]
    },
    {
        paramName: "username",
        description: "User name - passed in from single-page-app html. Defaults in IDE only to Billy.",
        options: ["Billy"]
    },
    {
        paramName: "coins",
        description: "Overrides the number of coins available - useful for testing. Normally this is obtained from the state manager, when running in product. Defaults to 0. Note that 'coins' is only available in a debug build - in runtime it is available as its euphemistic alias 'data', which we use to make hacking the session a bit more difficult.",
        options: ["numeric"]
    },
    {
        paramName: "lessontype",
        description: `When running a lesson directly in intermediate, the "tutorial" value indicates that the progress meter should be covered.`,
        options: ["normal", "tutorial"]
    },
    {
        paramName: "parentlink",
        description: "Show the parent link on the right of the copyright bar. Defaults to false.",
        options: ["boolean"]
    },
    {
        paramName: "season",
        description: "Overrides the default season detection (affects some engagement backgrounds, etc.) The choice is normally done by consulting Date Dec 1 to Jan 31.",
        options: ["winter"]
    },
    {
        paramName: "flash",
        description: `Show invalidation flashes. Green flashes (think grass) show redraws on the lower (content) canvas and blue flashes (think sky) show redraws on the upper (engagement) canvas in the two-canvas stack. Bear in mind when doing perf work that the act of showing the flashes adds its own overhead. You can also turn this on "just in time" by typing __flash=true at the console.`,
        options: ['boolean']
    },
    {
        paramName: "cc",
        description: `Use this to turn off closed-captioning support (used to be an opt-in, now it is an opt-out). The cc feature is enabled by students from the sound menu, and the current setting is persisted as the per-user properties "sound" and "cc", both boolean. When running a lesson from the IDE you can use the file DefaultState.csv to turn it on right from the beginning (Property.soundOptions). Note also that two experimental features are turned off by default but can still be turned on - they are cc=drag (draggable closed caption) and cc=scroll (scrollable window).`,
        options: ['boolean']
    },
    {
        paramName: "slowsync",
        description: "Use when running serverless to extend the simulated State Manager syncProperties time from 100ms to a full 3s, simulating a slow end-user connection or bogged-down server, and giving you a chance to press pause, etc. This catches many issues that we don't see until production.",
        options: ["boolean"]
    },
    {
        paramName: "autoplay",
        description: "Defaults to true. Use autoplay=false to simulate a browser that denies autoplay of videos, such as Safari 11. We should detect this and put up a scrim and play button - a click then restarts the video, which will then succeed in starting because it was explicitly authorized by the user (i.e. the play() command is in the same stack frame as the click event).",
        options: ["boolean"]
    },
    {
        paramName: "retina",
        description: "When true, forces the entire app to render at 2x density, regardless of the actual hardware. When false, forces the entire app to render at 1x density, regardless of the actual hardware.",
        options: ["boolean"]
    },
    {
        paramName: "retrystaticrequests",
        description: `If true, we will retry "critical" static load requests up to 3 times, with exponential backoff. This might help the user survive an intermittent nework failure. A critical load is one that we would need to exit with a fatal error for.`,
        options: ["boolean"]
    },
    {
        paramName: "powerthrough",
        description: `When running tests from the test catalog, use: &powerthrough=true if you know the test would fail, but you want it to "power through" anyway, in order to generate a new baseline. &powerthrough=clean if you want to skip the input lines starting with > which are not generated by user input and generate a new baseline without these lines.`,
        options: ["true", "clean"]
    },
    {
        paramName: "login",
        description: "Causes the login experience to be run.",
        options: ['true']
    },
    {
        paramName: "earlyfly",
        description: "True everywhere by default. An earlyfly=false is often found at the top of a .suite file that has older tests written prior to csdata 1.7. New tests should omit earlyfly, as the default is true. However, turning on earlyfly can make a gifted run for an older test no longer powerthrough. Ideally we would not have any earlyfly=false tests in our suites, but it is a bit of a pain to fix them.",
        options: ["boolean"]
    },
    {
        paramName: "newinput",
        description: `Temporary flag that allows us to experiment with various bug fixes and behavior changes associated with the DBLTextInput class. Currently this defaults to false and lets us test the new behaviors. There is also a "use_new_input true" compiler statement. When we are ready it will default to true, and the flag will be there to opt OUT for testing.`,
        options: ["boolean"]
    },
    {
        paramName: "newkeypad",
        description: "Lets us experiment with the new keypad design - see newinput.",
        options: ['boolean']
    },
    {
        paramName: "softtabkey",
        description: "If true, attempts to add a tab key to the soft keypad in situations where tabbing is possible. Only possible with newinput and newkeypad.",
        options: ['boolean']
    },
    {
        paramName: "rating",
        description: "Probability (in integer percent 0-100) of obtaining a lesson rating dialog in Intermediate Engagement. Defaults to 0 (no rating).",
        options: ['numeric']
    },
    {
        paramName: "altrating",
        description: "Probability (in integer percent 0-100) of obtaining a student-enjoyment rating dialog in the Intermediate Engagement lesson chooser. Defaults to 0 (no rating).",
        options: ['numeric']
    },
    {
        paramName: "lessonfeedbackrandom",
        description: "Use with rating (above) to allow random rating.",
        options: ['boolean']
    },
    {
        paramName: "lessonfeedbackoptin",
        description: "A rating button appears on the lesson feedback dialog.",
        options: ['boolean']
    },
    {
        paramName: "skipTTS",
        description: "This replaces any TTS audio with a blank MP3 file instead, so that TTS audio does not play.",
        options: ['boolean']
    },
    {
        paramName: "prewarm",
        description: "A debug-only flag - use this on a lesson or suite automation run to generate prewarm.csv output instead of the standard .run log at the end of the lesson or suite run. For potential use in prewarming the Text-To-Speech cache.",
        options: ['boolean']
    },
    {
        paramName: "multipleLanguages",
        description: "Runs a test or suite in English then in Spanish and outputs the results. Play mismatches are ignored and printed out at the end of the Spanish run. runtime-test can be modified to include more languages for playback.",
        options: ['boolean']
    },
    {
        paramName: "ignorePlayMismatches",
        description: "Runs a test or suite ignoring any play statement mismatches. If a different mismatch or fatal is reached then execution stops and a red screen is seen like normals. All play statement mismatches up till that point will be printed at the end. If only play mismatches are seen then a teal screen is displayed with all the lesson output first then the mismatches shown below. Otherwise a green screen is displayed with just the lesson output.",
        options: ['boolean']
    },
    {
        paramName: "newsfmetrics",
        description: "If enabled, the client will request and display in the intermediate engagements' WeeklyGoalPanel the new student-facing metrics Week Streak and Weekly Time. Note that this is a temporary flag that will be used for ramping up the feature and will be removed afterwards. Also note that flag 'newweeklygoal' needs to be true so that the new WeeklyGoalPanel containing the new metrics is displayed.",
        options: ['boolean']
    },
    {
        paramName: "logcsdata",
        description: "Tells the client to log clickstream data.",
        options: ['boolean']
    },
    {
        paramName: "visualcheck",
        description: `Runs a test suite with visual check tool in "quick" or "full" mode. See Visual Regression Testing Tool. When playing a lesson with visualcheck=save, it will add snapshot hashes lines starting with "ss:" to the run log and save an ".ss" file containing all snapshots. In replay mode visualcheck could be set to:  1. "save" to download an ".ss" file 2. "compare" to compare the replayed test with a previously saved one in manual mode ".ss" file  3. "replaycompare" to compare the replayed test with a previously saved one in replay mode ".ss" file  4. "replay" to replay the test 2 times and compare their snapshots (the comparison is done in memory) See Visually Test Lesson Replay Defaults to visualcheck=off.`,
        options: ['quick', "full", "save", "compare", "replay", "replaycompare"]
    },
    {
        paramName: "sendfeedback",
        description: "Allows the send feedback feature to be disabled (new - for certain districts with stringent privacy requirements).",
        options: ["boolean"]
    },
    {
        paramName: "replay",
        description: "Allows the send feedback feature to be disabled (new - for certain districts with stringent privacy requirements).",
        options: ["boolean"]
    },
    {
        paramName: "transcript",
        description: `Feature switch to gate recording of lesson transcript data. When used on a localhost url, it will also cause the resulting "green" text output to be the actual transcript in json form, which is what we actually store for replay in edex.`,
        options: ["boolean"]
    },
    {
        paramName: "clientevents",
        description: `Feature switch to enable sending events to play app's clientEvents.  When enabled, instrumented events are sent in batches up to every 10 seconds.`,
        options: ["boolean"]
    },
    {
        paramName: "qosevents",
        description: `Feature switch to enable sending QoS health events.  Events are sent via clientEvents, so the clientevents flag must also be true to fully enable.`,
        options: ["boolean"]
    },
    {
        paramName: "nolessonbanner",
        description: `Tells whether to enable the experimental feature where the lesson title banner in intermediate engagements is integrated into the header during lessons so that the space can be used by the lesson.`,
        options: ["boolean"]
    },
    {
        paramName: "placement",
        description: `Lets you test placement mode - if no passing score by failOrFly you fail, skip_ascending is also skip_descending, and some engagement tweaks to  offer fewer distractions, namely engagement locks.`,
        options: ["boolean"]
    },
    {
        paramName: "unlocksquigglebook",
        description: `Unlocks all squiggle book content in reading park`,
        options: ["boolean"]
    },
    {
        paramName: "forcetts",
        description: `In a mixed recorded/tts environment (like when developing in literacy), it can be helpful to just temporarily force tts.`,
        options: ["boolean"]
    },
    {
        paramName: "screenerMode",
        description: `puts Math client in Screener (Launchpad) mode, passing user through the Screener intro/outro and lesson transitions along with Screener-adjusted lessons. `,
        options: ["boolean"]
    },
    {
        paramName: "fixedForm",
        description: `puts Math client in Fixed Form mode - same as Screener mode, but with fixed lesson seeds.`,
        options: ["boolean"]
    },
    {
        paramName: "screenerHelpMe",
        description: `Runs auto HelpMe when Math client is in Screener (Launchpad) mode and the lesson played is marked with launchpad_help_me_eligible true`,
        options: ["boolean"]
    },
    {
        paramName: "toolhelpinstandalone",
        description: "In squiggly engagement, normally a toolhelp appears if the lessons tools has never been seen before - but this is super annoying when running lessons standalone in development, because it always shows, so we turn it off in this case. This flag turns it back on, and is useful when testing toolhelp standalone.",
        options: ["boolean"]
    },
    {
        paramName: "skipintro",
        description: "Skips the squiggly engagement intro sequence.",
        options: ["boolean"]
    },
    {
        paramName: "unlockmonsterfriend",
        description: "In Squiggly engagement, allows you to unlock all monster cards when testing the engagement locally.",
        options: ["boolean"]
    },
    {
        paramName: "usetestcsvdata",
        description: "For running regression tests in the dcel engagement. Causes questions to be generated with test data",
        options: ["boolean"]
    },
    {
        paramName: "snapshot",
        description: `Added to urls created by the scripts described in 68. Creating new thumbnails to support EdEx - causes some components that display lesson preliminaries to either not show, or to dismiss very fast, e.g. Tool Help, Academic Popup, Context Choosers, etc. So they don’t mess up the thumbnail image taken by puppeteer.`,
        options: ["boolean"]
    }
];