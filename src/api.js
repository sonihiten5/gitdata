const userimg = document.getElementById("userimage");
const gitid = document.getElementById("gitid");
const gitname = document.getElementById("gitname");
const follower = document.getElementById("follower");
const following = document.getElementById("following");
const submitbtn = document.getElementById("submit");
const repobox = document.querySelector(".repo__box");

let user_name = '';

function inputfunction() {

    let inputuser = document.getElementById("inputuser").value.trim();

    if (inputuser.length <= 0) {
        alert("Please and Id");
        document.getElementById("inputuser").value = "";
        document.getElementById("inputuser").focus();
        return false;
    } else {
        usernameid = inputuser.split("").join("");
        fetchuser();
        document.getElementById("inputuser").value = "";
        document.getElementById("inputuser").focus();
        console.log(inputuser);
    }
}

submitbtn.addEventListener('click', function (e) {
    e.preventDefault();
    inputfunction();

});

function fetchuser() {
    fetch(`https://api.github.com/users/${document.getElementById("inputuser").value.trim()}`)
        .then(res => res.json())
        .then(function (data) {
            if (data.message == "Not Found") {
                alert("repo not found");
                return false;
            } else {
                userimg.src = data.avatar_url;
                gitid.innerHTML = data.login;
                gitname.innerHTML = data.name;
                follower.innerHTML = data.followers;
                following.innerHTML = data.following;
            }

            // console.log(data);
        })


// Repository INfo

    fetch(`https://api.github.com/users/${document.getElementById("inputuser").value.trim()}/repos`)
        .then(res => res.json())
        .then(function (repodata) {
            // reponame.innerHTML = data.name;
            console.log(repodata.map(item => item.name));
            // if user found but not repo
            if (repodata.length <= 0) {
                repobox.innerHTML = `
                <div class="repo__item p-4">
                <div class="repo__name" id="reponame">Repository Not Found</div>
                </div>
                `
            } else {
                // if user and repo not found
                if (repodata.message === "Not Found") {
                    repobox.innerHTML = `
                    <div class="repo__item p-4">
                    <div class="repo__name" id="reponame">-</div>
                    <div class="repo__detail">
                        <div class="repo__detail__star">
                            <i class="fa fa-star mr-2"></i>10
                        </div>
                        <div class="repo__detail__fork">
                            <i class="fa fa-code-branch mr-2 "></i>10
                        </div>
                        <div class="repo__detail__file">
                            <i class="fa fa-file mr-2"></i>10
                        </div>
                    </div>
            </div>
                    `
                    userimg.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
                    gitid.innerHTML = '-';
                    gitname.innerHTML = '-';
                    follower.innerHTML = '-';
                    following.innerHTML = '-';
                }
                // DATA full display
                else {
                    let repo_Data = repodata.map(item => {
                        return (`
                        <div class="repo__item p-4">
                        <div class="repo__name" id="reponame">"${item.name}"</div>
                        <div class="repo__detail">
                            <div class="repo__detail__star">
                                <i class="fa fa-star mr-2"></i>${item.watchers}
                            </div>
                            <div class="repo__detail__fork">
                                <i class="fa fa-code-branch mr-2 "></i>${item.forks}
                            </div>
                            <div class="repo__detail__file">
                                <i class="fa fa-file mr-2"></i>${item.size}
                            </div>
                        </div>
               
                        </div>
                        `);
                    })
                    repobox.innerHTML = repo_Data.join("");
               
                }
            }
        
            console.log(repodata.map(item => item));
        })
}



