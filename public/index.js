/* let's go! */
  const profileLink = 'https://api.github.com/users/abdulrahman-2020';
  const repoLink = 'https://api.github.com/users/abdulrahman-2020/repos';
  const contributorsUrlForTopRipo = 'https://api.github.com/repos/abdulrahman-2020/33-js-concepts/contributors'
  const startedLink = 'https://api.github.com/users/abdulrahman-2020/starred'
  const lang = 'https://api.github.com/users/abdulrahman-2020/repos'



function callData(url,cb){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            switch (xhr.status) {
                case 200:
                    let data = JSON.parse(xhr.responseText)
                    cb(data)
                    break;
                case 404:
                    console.log('Error 404 Page Not Found');;
                    document.body.textContent = 'Error 404 Page Not Found';
                default:
                    break;
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function selector(selector){
    return document.querySelector(selector)
}

function sectionOneDom(data){
    selector('#github-user-handle').textContent = data.name;
    selector('#github-user-link').href = data.html_url;
    selector('#github-user-avatar').src = data.avatar_url;
    selector('#github-user-repos').textContent = data.public_repos;

}
function stared(data){
    selector('#github-repos-stars').textContent = data.length;
}


function sectionTwoDom(data){
    selector('#github-repo-link').href = data[0].html_url;
    selector('#github-repo-name').textContent = data[0].name;
    selector('#github-repo-created').textContent = data[0].owner.login;
    selector('#github-repo-watchers').textContent = data[0].watchers_count;
    selector('#github-repo-open-issues').textContent = data[0].open_issues;
    selector('#github-repo-contributors').textContent = data[0].contributors_url;
}

function contributors(data){
    selector('#github-repo-contributors').textContent = data[0].login
}

function language(data){
    let arr = [];
    data.forEach(ele => {
        if(ele.language !== null){
            selector('#github-repos-languages').textContent += ' '+ ele.language;
        }
    });
    
    
}




callData(profileLink,sectionOneDom);
callData(repoLink,sectionTwoDom);
callData(startedLink,stared);
callData(lang,language);
callData(contributorsUrlForTopRipo,contributors);


