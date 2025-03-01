/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./src/components/ui/NavigationHeader.tsx":
/*!************************************************!*\
  !*** ./src/components/ui/NavigationHeader.tsx ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/../node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(pages-dir-node)/../node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__]);\n([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\n\nconst NavigationHeader = ()=>{\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();\n    const isEnrollPage = pathname === \"/enroll\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: \"w-full bg-background border-b border-border\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n            className: \"container mx-auto px-4 py-4 flex justify-between items-center\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center space-x-2 group transition-transform duration-500 hover:scale-105\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        href: \"/\",\n                        className: \"text-xl font-bold transition-colors duration-500 group-hover:text-orange-500\",\n                        children: \"give.fun\"\n                    }, void 0, false, {\n                        fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"flex space-x-4 items-center\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {\n                            mode: \"wait\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.li, {\n                                initial: {\n                                    opacity: 0,\n                                    y: -20\n                                },\n                                animate: {\n                                    opacity: 1,\n                                    y: 0\n                                },\n                                exit: {\n                                    opacity: 0,\n                                    y: 20\n                                },\n                                transition: {\n                                    duration: 0.2\n                                },\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: isEnrollPage ? \"/\" : \"/enroll\",\n                                    className: \"px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring\",\n                                    children: isEnrollPage ? \"Back to Home\" : \"Enroll Nonprofit\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                                    lineNumber: 32,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, isEnrollPage ? \"home\" : \"enroll\", false, {\n                                fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                                lineNumber: 25,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                            lineNumber: 24,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__.ConnectButton, {}, void 0, false, {\n                            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                            lineNumber: 40,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n            lineNumber: 14,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/components/ui/NavigationHeader.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavigationHeader);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb21wb25lbnRzL3VpL05hdmlnYXRpb25IZWFkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUMwQjtBQUNHO0FBQ2lCO0FBQ1U7QUFDRDtBQUV2RCxNQUFNTSxtQkFBNkI7SUFDakMsTUFBTUMsV0FBV0wsNERBQVdBO0lBQzVCLE1BQU1NLGVBQWVELGFBQWE7SUFFbEMscUJBQ0UsOERBQUNFO1FBQU9DLFdBQVU7a0JBQ2hCLDRFQUFDQztZQUFJRCxXQUFVOzs4QkFDYiw4REFBQ0U7b0JBQUlGLFdBQVU7OEJBQ2IsNEVBQUNULGtEQUFJQTt3QkFDSFksTUFBSzt3QkFDTEgsV0FBVTtrQ0FDWDs7Ozs7Ozs7Ozs7OEJBSUgsOERBQUNJO29CQUFHSixXQUFVOztzQ0FDWiw4REFBQ04sMERBQWVBOzRCQUFDVyxNQUFLO3NDQUNwQiw0RUFBQ1osaURBQU1BLENBQUNhLEVBQUU7Z0NBRVJDLFNBQVM7b0NBQUVDLFNBQVM7b0NBQUdDLEdBQUcsQ0FBQztnQ0FBRztnQ0FDOUJDLFNBQVM7b0NBQUVGLFNBQVM7b0NBQUdDLEdBQUc7Z0NBQUU7Z0NBQzVCRSxNQUFNO29DQUFFSCxTQUFTO29DQUFHQyxHQUFHO2dDQUFHO2dDQUMxQkcsWUFBWTtvQ0FBRUMsVUFBVTtnQ0FBSTswQ0FFNUIsNEVBQUN0QixrREFBSUE7b0NBQ0hZLE1BQU1MLGVBQWUsTUFBTTtvQ0FDM0JFLFdBQVU7OENBRVRGLGVBQWUsaUJBQWlCOzs7Ozs7K0JBVjlCQSxlQUFlLFNBQVM7Ozs7Ozs7Ozs7c0NBY2pDLDhEQUFDSCxpRUFBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLeEI7QUFFQSxpRUFBZUMsZ0JBQWdCQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvYW1hbnNoYWgvRG9jdW1lbnRzL0hhY2thdGhvbnMvaHVtYW5pdHktYmFiL3NpdGUvc3JjL2NvbXBvbmVudHMvdWkvTmF2aWdhdGlvbkhlYWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VQYXRobmFtZSB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IENvbm5lY3RCdXR0b24gfSBmcm9tIFwiQHJhaW5ib3ctbWUvcmFpbmJvd2tpdFwiO1xuXG5jb25zdCBOYXZpZ2F0aW9uSGVhZGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpO1xuICBjb25zdCBpc0Vucm9sbFBhZ2UgPSBwYXRobmFtZSA9PT0gXCIvZW5yb2xsXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInctZnVsbCBiZy1iYWNrZ3JvdW5kIGJvcmRlci1iIGJvcmRlci1ib3JkZXJcIj5cbiAgICAgIDxuYXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcHgtNCBweS00IGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBncm91cCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDAgaG92ZXI6c2NhbGUtMTA1XCI+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGhyZWY9XCIvXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTUwMCBncm91cC1ob3Zlcjp0ZXh0LW9yYW5nZS01MDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIGdpdmUuZnVuXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC00IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2UgbW9kZT1cIndhaXRcIj5cbiAgICAgICAgICAgIDxtb3Rpb24ubGlcbiAgICAgICAgICAgICAga2V5PXtpc0Vucm9sbFBhZ2UgPyBcImhvbWVcIiA6IFwiZW5yb2xsXCJ9XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTIwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IDIwIH19XG4gICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMiB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgIGhyZWY9e2lzRW5yb2xsUGFnZSA/IFwiL1wiIDogXCIvZW5yb2xsXCJ9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtbWQgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1hY2NlbnQgaG92ZXI6dGV4dC1hY2NlbnQtZm9yZWdyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNFbnJvbGxQYWdlID8gXCJCYWNrIHRvIEhvbWVcIiA6IFwiRW5yb2xsIE5vbnByb2ZpdFwifVxuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8L21vdGlvbi5saT5cbiAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICA8Q29ubmVjdEJ1dHRvbiAvPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9uYXY+XG4gICAgPC9oZWFkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uSGVhZGVyOyJdLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJ1c2VQYXRobmFtZSIsIm1vdGlvbiIsIkFuaW1hdGVQcmVzZW5jZSIsIkNvbm5lY3RCdXR0b24iLCJOYXZpZ2F0aW9uSGVhZGVyIiwicGF0aG5hbWUiLCJpc0Vucm9sbFBhZ2UiLCJoZWFkZXIiLCJjbGFzc05hbWUiLCJuYXYiLCJkaXYiLCJocmVmIiwidWwiLCJtb2RlIiwibGkiLCJpbml0aWFsIiwib3BhY2l0eSIsInkiLCJhbmltYXRlIiwiZXhpdCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/components/ui/NavigationHeader.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"(pages-dir-node)/../node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ui_NavigationHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/NavigationHeader */ \"(pages-dir-node)/./src/components/ui/NavigationHeader.tsx\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var _wagmi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../wagmi */ \"(pages-dir-node)/./src/wagmi.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_ui_NavigationHeader__WEBPACK_IMPORTED_MODULE_3__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__, wagmi__WEBPACK_IMPORTED_MODULE_5__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_6__, _wagmi__WEBPACK_IMPORTED_MODULE_7__]);\n([_components_ui_NavigationHeader__WEBPACK_IMPORTED_MODULE_3__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__, wagmi__WEBPACK_IMPORTED_MODULE_5__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_6__, _wagmi__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\nconst client = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClient();\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_5__.WagmiProvider, {\n        config: _wagmi__WEBPACK_IMPORTED_MODULE_7__.config,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClientProvider, {\n            client: client,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_6__.RainbowKitProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"min-h-screen bg-background\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_NavigationHeader__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n                            lineNumber: 18,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                            ...pageProps\n                        }, void 0, false, {\n                            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n                            lineNumber: 19,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n                    lineNumber: 17,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n                lineNumber: 16,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n            lineNumber: 15,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/amanshah/Documents/Hackathons/humanity-bab/site/src/pages/_app.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ2E7QUFFcUI7QUFDUztBQUNuQztBQUNzQjtBQUMxQjtBQUVsQyxNQUFNTSxTQUFTLElBQUlMLDhEQUFXQTtBQUU5QixTQUFTTSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUNFLDhEQUFDTixnREFBYUE7UUFBQ0UsUUFBUUEsMENBQU1BO2tCQUMzQiw0RUFBQ0gsc0VBQW1CQTtZQUFDSSxRQUFRQTtzQkFDM0IsNEVBQUNGLHNFQUFrQkE7MEJBQ2pCLDRFQUFDTTtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNYLHVFQUFnQkE7Ozs7O3NDQUNqQiw4REFBQ1E7NEJBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXBDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWFuc2hhaC9Eb2N1bWVudHMvSGFja2F0aG9ucy9odW1hbml0eS1iYWIvc2l0ZS9zcmMvcGFnZXMvX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgJ0ByYWluYm93LW1lL3JhaW5ib3draXQvc3R5bGVzLmNzcyc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuaW1wb3J0IE5hdmlnYXRpb25IZWFkZXIgZnJvbSAnQC9jb21wb25lbnRzL3VpL05hdmlnYXRpb25IZWFkZXInO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgV2FnbWlQcm92aWRlciB9IGZyb20gJ3dhZ21pJztcbmltcG9ydCB7IFJhaW5ib3dLaXRQcm92aWRlciB9IGZyb20gJ0ByYWluYm93LW1lL3JhaW5ib3draXQnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vd2FnbWknO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxXYWdtaVByb3ZpZGVyIGNvbmZpZz17Y29uZmlnfT5cbiAgICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17Y2xpZW50fT5cbiAgICAgICAgPFJhaW5ib3dLaXRQcm92aWRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1iYWNrZ3JvdW5kXCI+XG4gICAgICAgICAgICA8TmF2aWdhdGlvbkhlYWRlciAvPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1JhaW5ib3dLaXRQcm92aWRlcj5cbiAgICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgICA8L1dhZ21pUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sIm5hbWVzIjpbIk5hdmlnYXRpb25IZWFkZXIiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJXYWdtaVByb3ZpZGVyIiwiUmFpbmJvd0tpdFByb3ZpZGVyIiwiY29uZmlnIiwiY2xpZW50IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJkaXYiLCJjbGFzc05hbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/wagmi.ts":
/*!**********************!*\
  !*** ./src/wagmi.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config)\n/* harmony export */ });\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_0__, wagmi_chains__WEBPACK_IMPORTED_MODULE_1__]);\n([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_0__, wagmi_chains__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nconst humanityTestnet = {\n    id: 1942999413,\n    name: 'Humanity Testnet',\n    nativeCurrency: {\n        decimals: 18,\n        name: 'Test Humanity Points',\n        symbol: 'tHP'\n    },\n    rpcUrls: {\n        default: {\n            http: [\n                'https://rpc.testnet.humanity.org'\n            ]\n        },\n        public: {\n            http: [\n                'https://rpc.testnet.humanity.org'\n            ]\n        }\n    },\n    blockExplorers: {\n        default: {\n            name: 'HumanityScan',\n            url: 'https://explorer.testnet.humanity.org'\n        }\n    },\n    testnet: true\n};\nconst config = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_0__.getDefaultConfig)({\n    appName: 'RainbowKit App',\n    projectId: 'YOUR_PROJECT_ID',\n    chains: [\n        humanityTestnet,\n        ...process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [\n            wagmi_chains__WEBPACK_IMPORTED_MODULE_1__.sepolia\n        ] : []\n    ],\n    ssr: true\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy93YWdtaS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEQ7QUFJcEM7QUFFdEIsTUFBTUUsa0JBQXlCO0lBQzdCQyxJQUFJO0lBQ0pDLE1BQU07SUFDTkMsZ0JBQWdCO1FBQ2RDLFVBQVU7UUFDVkYsTUFBTTtRQUNORyxRQUFRO0lBQ1Y7SUFDQUMsU0FBUztRQUNQQyxTQUFTO1lBQ1BDLE1BQU07Z0JBQUM7YUFBbUM7UUFDNUM7UUFDQUMsUUFBUTtZQUNORCxNQUFNO2dCQUFDO2FBQW1DO1FBQzVDO0lBQ0Y7SUFDQUUsZ0JBQWdCO1FBQ2RILFNBQVM7WUFDUEwsTUFBTTtZQUNOUyxLQUFLO1FBQ1A7SUFDRjtJQUNBQyxTQUFTO0FBQ1g7QUFFTyxNQUFNQyxTQUFTZix3RUFBZ0JBLENBQUM7SUFDckNnQixTQUFTO0lBQ1RDLFdBQVc7SUFDWEMsUUFBUTtRQUNOaEI7V0FDSWlCLFFBQVFDLEdBQUcsQ0FBQ0MsMkJBQTJCLEtBQUssU0FBUztZQUFDcEIsaURBQU9BO1NBQUMsR0FBRyxFQUFFO0tBQ3hFO0lBQ0RxQixLQUFLO0FBQ1AsR0FBRyIsInNvdXJjZXMiOlsiL1VzZXJzL2FtYW5zaGFoL0RvY3VtZW50cy9IYWNrYXRob25zL2h1bWFuaXR5LWJhYi9zaXRlL3NyYy93YWdtaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXREZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCc7XG5pbXBvcnQge1xuICBzZXBvbGlhLFxuICBDaGFpblxufSBmcm9tICd3YWdtaS9jaGFpbnMnO1xuXG5jb25zdCBodW1hbml0eVRlc3RuZXQ6IENoYWluID0ge1xuICBpZDogMTk0Mjk5OTQxMyxcbiAgbmFtZTogJ0h1bWFuaXR5IFRlc3RuZXQnLFxuICBuYXRpdmVDdXJyZW5jeToge1xuICAgIGRlY2ltYWxzOiAxOCxcbiAgICBuYW1lOiAnVGVzdCBIdW1hbml0eSBQb2ludHMnLFxuICAgIHN5bWJvbDogJ3RIUCcsXG4gIH0sXG4gIHJwY1VybHM6IHtcbiAgICBkZWZhdWx0OiB7IFxuICAgICAgaHR0cDogWydodHRwczovL3JwYy50ZXN0bmV0Lmh1bWFuaXR5Lm9yZyddXG4gICAgfSxcbiAgICBwdWJsaWM6IHtcbiAgICAgIGh0dHA6IFsnaHR0cHM6Ly9ycGMudGVzdG5ldC5odW1hbml0eS5vcmcnXVxuICAgIH1cbiAgfSxcbiAgYmxvY2tFeHBsb3JlcnM6IHtcbiAgICBkZWZhdWx0OiB7XG4gICAgICBuYW1lOiAnSHVtYW5pdHlTY2FuJyxcbiAgICAgIHVybDogJ2h0dHBzOi8vZXhwbG9yZXIudGVzdG5ldC5odW1hbml0eS5vcmcnXG4gICAgfVxuICB9LFxuICB0ZXN0bmV0OiB0cnVlXG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0gZ2V0RGVmYXVsdENvbmZpZyh7XG4gIGFwcE5hbWU6ICdSYWluYm93S2l0IEFwcCcsXG4gIHByb2plY3RJZDogJ1lPVVJfUFJPSkVDVF9JRCcsXG4gIGNoYWluczogW1xuICAgIGh1bWFuaXR5VGVzdG5ldCxcbiAgICAuLi4ocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRU5BQkxFX1RFU1RORVRTID09PSAndHJ1ZScgPyBbc2Vwb2xpYV0gOiBbXSksXG4gIF0sXG4gIHNzcjogdHJ1ZSxcbn0pO1xuIl0sIm5hbWVzIjpbImdldERlZmF1bHRDb25maWciLCJzZXBvbGlhIiwiaHVtYW5pdHlUZXN0bmV0IiwiaWQiLCJuYW1lIiwibmF0aXZlQ3VycmVuY3kiLCJkZWNpbWFscyIsInN5bWJvbCIsInJwY1VybHMiLCJkZWZhdWx0IiwiaHR0cCIsInB1YmxpYyIsImJsb2NrRXhwbG9yZXJzIiwidXJsIiwidGVzdG5ldCIsImNvbmZpZyIsImFwcE5hbWUiLCJwcm9qZWN0SWQiLCJjaGFpbnMiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRU5BQkxFX1RFU1RORVRTIiwic3NyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/wagmi.ts\n");

/***/ }),

/***/ "../../server/app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@rainbow-me"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();