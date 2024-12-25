/* Not implemented for:
* lesson
* background
* progressmeter
* popin
* 
*/

//! Add rest
export const paramsData = [
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
];