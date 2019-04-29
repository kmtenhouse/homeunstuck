        //MAIN SCRIPT
        setTimeout(function () {
            const chatlog = document.getElementById('content');
            console.log("Firing quirk fix");
            recurseContent(chatlog);
        }, 5000);


        //DOM TRAVERSAL
        function recurseContent(element) {
            //BASE CASE ONE: a simple span tag
            if (element.nodeName === 'SPAN' && element.children.length === 0) { //span with no children - easy to check!
                fixQuirk(element);
                return;
            }

            //BASE CASE TWO: an element that's not a span but still has no children
            if (!element.hasChildNodes()) {
                return;
            }

            //otherwise, traverse the children
            const numChildren = element.children.length;

            for (let i = 0; i < numChildren; i++) {
                let currentNode = element.children[i];
                //check for the one irritating case where a single span has a chunk of br tags
                //because people don't know how to act
                if (isMultiLinePesterLog(currentNode)) {
                    const splitUpLines = currentNode.innerHTML.split("<br>").map(str => str = str.trim());
                    //clear the current content
                    currentNode.innerHTML = '';
                    splitUpLines.forEach((line, index) => {
                        let newSpan = document.createElement('span');
                        newSpan.textContent = line;
                        fixQuirk(newSpan);
                        currentNode.appendChild(newSpan);
                        //append a break tag (so long as we're not on the last element)
                        if (index !== splitUpLines.length - 1) {
                            currentNode.appendChild(document.createElement('br'));
                        }
                    });
                }
                else {
                    //otherwise, just keep on recursin'
                    recurseContent(element.children[i]);
                }
            }
        }

        //returns TRUE if this particular node is a type of pesterlog span which contains multiple lines of text separated with br
        //returns FALSE if there are deeper levels than just text & br
        function isMultiLinePesterLog(node) {
            if (node.nodeName !== 'SPAN' || node.children.length === 0) {
                return false;
            }

            let numChildren = node.children.length;
            for (let i = 0; i < numChildren; i++) {
                if (node.children[i].nodeName !== 'BR') {
                    return false;
                }
            }
            return true;
        }

        //MUTATION CALLBACKS
        function mutationCallback(mutationList, observer) {
            //we only want to bother replacing the text if the chatlog is being opened
            //we also only want to do this once
            var completedSubstitution = false;
            mutationList.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && !completedSubstitution) {
                    mutation.target.classList.forEach(function (value, index) {
                        console.log(mutation);
                        if (value === "open" && !completedSubstitution) {
                            //CODE GOES HERE
                            observer.disconnect(); //after we've substituted once, kill the observer
                            completedSubstitution = true;
                        }
                    });
                }
            });
        }

        //DETERMINE AND FIX QUIRK
        //EXPECTS a source node (SPAN with no children)
        function fixQuirk(span) {
            const spanText = span.textContent.trim();
            let pesterLogID = spanText.slice(0, 3);
            switch (pesterLogID) {
                case "UK:":
                    fixMurrit(span);
                    break;
                case "WA:":
                    fixLaivan(span);
                    break;
                default:
                    break;
            }
        }

        //FIXES FOR QUIRKS
        //takes in a basic span and a string of text that should be added to it
        function replaceSpanText(span, newText) {
            let newTextNode = document.createTextNode(newText);
            span.innerHTML = '';
            span.appendChild(newTextNode);
        }