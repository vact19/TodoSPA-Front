import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";
// 백엔드로 요청을 보낼 때 사용할 유틸리티 함수. 이후 반복해서 CRUD 메서드 등에 사용
export function call(api, method, request) {
    // 모든 API의 헤더에 액세스 토큰을 추가하는 부분을 구현한다.
    // 로그인에 관련되지 않은 모든 API 콜은 call()을 통해 이루어진다.
    // call()에 토큰이 존재할 경우 헤더에 추가
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    //로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    // fetch는 Promise를 리턴하고, then과 catch에 콜백 함수를 전달해 응답 처리
    // The callback to execute when the Promise is resolved. ( then에 대한 설명. Promise가 resolved일 때 발생하는 콜백함수)
    return fetch(options.url, options).then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
                // response.ok가 true이면 정상적인 응답을 받은 것이고, 아니면 에러 응답을 받은 것.
                return Promise.reject(json);
            }
            return json;
        })
    )
        .catch((error) => {
            // 추가된 부분. login 페이지로 리다이렉트시키기
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/login"; // redirect
            }
            return Promise.reject(error);
        });
}


// 로그인 시 받은 토큰을 로컬 스토리지에 저장하며, 백엔드에 API 콜을 할 때마다
// 로컬 스토리지에서 액세스 토큰을 불러와 헤더에 추가해 준다.
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {// 토큰이 존재할 경우
                // 로컬 스토리지에 토큰 저장.
                localStorage.setItem(ACCESS_TOKEN, response.token);
                alert(response.token);
                //토큰이 존재하는 경우 Todo 화면 리다이렉트
                window.location.href = "/";
            }
        });
}

// 로그인과 반대로, 로컬 스토리지에 존재하는 액세스 토큰을 제거하고 로그인 페이지로
// 리다이렉트함.
export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}

// 회원가입
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}




