//MUTATION CALLBACKS
function mutationCallback(mutationList, observer) {
    //we only want to bother replacing the text if the chatlog is being opened
    //we also only want to do this once
    var completedSubstitution = false;
    mutationList.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && !completedSubstitution) {
            mutation.target.classList.forEach(function (value, index) {
                if (value === "open" && !completedSubstitution) {
                    const chatlog = document.getElementById('content');
                    console.log("Firing quirk fix");
                    recurseContent(chatlog);
                    observer.disconnect(); //after we've substituted once, kill the observer
                    completedSubstitution = true;
                }
            });
        }
    });
}