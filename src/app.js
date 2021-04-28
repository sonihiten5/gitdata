const submitbtn = document.getElementById("submit");

class main {
    constructor(user_Img, git_Id, git_Name, Follower, Following, Repobox) {
        user_Img = document.getElementById("userimage");
        git_Id = document.getElementById("gitid");
        git_Name = document.getElementById("gitname");
        Follower = document.getElementById("follower");
        Following = document.getElementById("following");
        Repobox = document.querySelector(".repo__box");
        this.userimg = user_Img;
        this.gitid = git_Id;
        this.gitname = git_Name;
        this.follower = Follower;
        this.following = Following;
        this.repobox = Repobox;
    }
    async fetchuser() {
        let U_url = (`https://api.github.com/users/${document.getElementById("inputuser").value.trim()}`)
        let U_res = await fetch(U_url);
        let U_Data = await U_res.json();
        return U_Data;
    }
    async repos() {
        let Rurl = (`https://api.github.com/users/${document.getElementById("inputuser").value.trim()}/repos`)
        let Rres = await fetch(Rurl);
        let RData = await Rres.json();
        return RData;
    }
}

class userinfo extends main {
    async Detail() {
        let data = await this.fetchuser();
        if (data.message == "Not Found") {
            alert("repo not found");
            return false;
        } else {
            this.userimg.src = data.avatar_url;
            this.gitid.innerHTML = data.login;
            this.gitname.innerHTML = data.name;
            this.follower.innerHTML = data.followers;
            this.following.innerHTML = data.following;
        }
    }
}

class userRepo extends userinfo {
    async Repo() {
        let data = await this.repos();
        if (data.length <= 0) {
            this.repobox.innerHTML = `
            <div class="repo__item p-4">
            <div class="repo__name" id="reponame">Repository Not Found</div>
            </div>
            `
        } else {
            // if user and repo not found
            if (data.message === "Not Found") {
                this.repobox.innerHTML = `
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
                this.userimg.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
                this.gitid.innerHTML = '-';
                this.gitname.innerHTML = '-';
                this.follower.innerHTML = '-';
                this.following.innerHTML = '-';
            }
            // DATA full display
            else {
                let repo_Data = data.map(item => {
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
                this.repobox.innerHTML = repo_Data.join("");
            }
        }
    }
}




function inputfunction() {
    let inputuser = document.getElementById("inputuser").value.trim();
    if (inputuser.length <= 0) {
        alert("Please and Id");
        document.getElementById("inputuser").value = "";
        document.getElementById("inputuser").focus();
        return false;
    } else {
        usernameid = inputuser.split("").join("");
        let detail = new userRepo();
        detail.Repo();
        detail.Detail();
        document.getElementById("inputuser").value = "";
        document.getElementById("inputuser").focus();
        console.log(inputuser);
    }
}

submitbtn.addEventListener('click', function (e) {
    e.preventDefault();
    inputfunction();

});