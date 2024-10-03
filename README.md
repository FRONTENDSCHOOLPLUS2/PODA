# PODA
<img width="2590" alt="Frame 7" src="https://github.com/user-attachments/assets/66ba9f96-4927-4d18-9011-70737b52dd53">

> 배포 주소 :
> https://poda.vercel.app/

<br/>

<p align=center>
  <a href="https://qpsqps123.notion.site/PODA-353b7f1e456a4205b2ccec039ee9c7bd?pvs=4">Notion</a>
  &nbsp; | &nbsp;
  <a href="https://www.figma.com/design/j4gA2xrP0hozLdIEb0K9jz/PODA?node-id=1324-2166&node-type=frame&t=JJzfMA2tbz4Slvo6-0">Figma</a>
  &nbsp;
</p>

## 📄 목차

- [📄 목차](#-목차)
- [📱 앱 설치](#-앱-설치)
- [✍🏻 프로젝트 개요](#-프로젝트-개요)
- [🚀 핵심 기능](#-핵심-기능)
  - [온보딩](#온보딩을-통해-저희-앱을-소개해요)
  - [로그인 및 회원가입](#로그인-후-서비스를-이용해보세요)
  - [내 일기 작성](#상황-태그들을-활용해서-간편하게-자신의-일기를-작성할-수-있어요)
  - [교환일기 발송](#자신의-일기를-다른-사람과-교환할-수-있어요)
- [⚙️ 기술 스택](#️-기술-스택)
- [🏛️ 서비스 구조](#️-서비스-구조)
  - [플로우 차트](#플로우-차트)
- [🔎 향후 추가할 기능 및 리팩토링 요소](#-향후-추가할-기능-및-리팩토링-요소)
- [✨ 담당 기능](#-담당-기능)
- [🧡 팀원 소개](#-팀원-소개)

<br />

## 📱 앱 설치

### 갤럭시
<table>
    <tbody>
        <tr>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/1413897acc66462bbe52ce61d19bd2e6/original/an1.jpg" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/7352b80a77f547138f484cf2101e8ff2/original/an2.jpg" width="100%" />
            </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/1212fb46671a4b9a8e67feef223d2208/original/an3.jpg" width="100%" />
            </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/5fe39660a7784daa800fc4ab6c50dd35/original/an4.jpg" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 아이폰
<table>
    <tbody>
        <tr>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/b70ff36fc4054a88aa7fcd1f28af8459/original/ipone1.png" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/33b2914ad7cf48e496d0751199de3217/original/ipone2.png" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/4fb4bd551c89492789dec1658e3c9209/original/ipone3.png" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://cdn.gamma.app/9r81jaaht7nlepc/16ccae5764b5455f8a8863ec23059964/original/ipone4.png" width="100%" />
          </td>
        </tr>
    </tbody>
</table>


<br />

## ✍🏻 프로젝트 개요

PODA는 일기를 빠르고 간편하게 작성할 수 있는 메모 웹 앱입니다. ‘Post Diary’의 줄임말인 PODA라는 이름처럼, 관심사를 가진 다른 사람들과 일기를 교환해볼 수 있습니다. 

<br />

## 🚀 핵심 기능

### 온보딩을 통해 저희 앱을 소개해요

<table>
    <thead>
        <tr>
            <th>온보딩</th>
            <th>온보딩 건너뛰기</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/49c446bd-ad0c-4d1c-9178-d7af79d7018f" width="100%" />
          </td>
          <td width="50%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/35998581-8764-4fe0-b3ad-b37d88aaaea7" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 로그인 후 서비스를 이용해보세요

#### Credentials 방식

<table>
    <thead>
        <tr>
            <th>회원가입</th>
            <th>최초 로그인</th>
            <th>최초 로그인 이후</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/6e5ff38c-c88b-49ae-a5d8-32086437b43d" width="100%" />
          </td>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/308ecbfe-7c8c-44d4-83eb-eda29eb80199" width="100%" />
          </td>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/0940c29b-4234-4856-9351-c6bf633964e2" width="100%" />
          </td>
        </tr>
    </tbody>
</table>


#### OAuth 2.0 방식
<table>
    <thead>
        <tr>
            <th>최초 로그인 이후</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/314a7da6-b4a5-4379-a2d2-6bb4b3e5eea7" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 상황 태그들을 활용해서 간편하게 자신의 일기를 작성할 수 있어요

<table>
    <thead>
        <tr>
            <th>내 일기 목록</th>
            <th>내 일기 작성</th>
            <th>내 일기 수정</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/5ea80915-23c1-4d94-b6bc-3216764c652c" width="100%" />
          </td>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/063f58cb-72e3-491f-83a9-5ddf65b06522" width="100%" />
          </td>
          <td width="33.33%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/74ccd148-e741-42f1-bba6-ab0a47323d21" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 자신의 일기를 다른 사람과 교환할 수 있어요

<table>
    <thead>
        <tr>
            <th>교환일기 발송</th>
            <th>교환일기 답장</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/6e9e1250-d713-4b28-bd58-aeef7bbc047a" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/c7e14949-4699-4875-8c88-b2fbc383827a" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

<br />

## ⚙️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>
            <p>프론트엔드</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=333333">
            <img src="https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white">
            <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
            <img src="https://img.shields.io/badge/TailwindCSS-red?&logo=TailwindCSS&logoColor=ffffff"/>
            <img src="https://img.shields.io/badge/shadcn/ui-47A248?&logo=shadcn/ui&logoColor=white">
          </td>
        </tr>
        <tr>
            <td>
            <p> 상태관리</p>
            </td>
            <td>
            <img src="https://img.shields.io/badge/React Query-blue?&logo=ReactQuery&logoColor=white">
            <img src="https://img.shields.io/badge/Zustand-4479A1?&logo=Zustand&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>패키지 매니저</p>
            </td>
            <td>
              <img src="https://img.shields.io/badge/npm-c12127?logo=npm&logoColor=ffffff">
            </td>
        </tr>
                <tr>
            <td>
                <p>배포</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Vercel-000000?logo=Vercel&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br />

## 🏛️ 서비스 구조

### 플로우 차트

| 온보딩, 로그인, 회원가입                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="1855" alt="온보딩, 로그인, 회원가입 플로우 차트" src="https://github.com/user-attachments/assets/8851ce75-ade1-4405-bebc-53c6b8b88852"> |

| 내 일기                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="1683" alt="내일기 페이지 플로우차트" src="https://github.com/user-attachments/assets/f22111a3-397f-49ee-a6cc-dc2301cdb1cc"> |

| 교환일기(User_A to User_B)                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="970" alt="스크린샷 2024-09-13 오후 5 31 15" src="https://github.com/user-attachments/assets/33db851b-3d82-4d4c-8708-968d854cd19d"> |

| 교환일기(User_B to User_A)                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="965" alt="스크린샷 2024-09-13 오후 5 37 25" src="https://github.com/user-attachments/assets/5d3b88c4-98af-41da-8797-37ef52eaa949"> |

## ✨ 담당 기능

### 공통
- 기획 및 레이아웃 설계
- PWA 적용

---

### 이종원
- 교환일기 랜덤 발송 및 재발송
- 내 일기 불러오기
- 교환일기 내역
- Push Notification 전송
       
---

### 정용우

- 온보딩
- 이메일 로그인 및 회원가입
- 소셜 로그인 및 회원가입
- 페이지 별 사용자 인가 설정
- 관심사 등록

---

### 이석형

- 일기 작성 및 수정
- 내가 작성한 일기 불러오기
- 관심사 변경

<br />

## 🔎 향후 추가할 기능 및 리팩토링 요소

### 로그인

### 일기 작성
- 추가할 기능
    - 카메라 촬영한 이미지 업로드 기능
    - 갤러리에서 이미지 여러장 불러와서 업로드 기능
    - 상황 태그들 담는 박스에 제스쳐 기능
    - mydiary 페이지에서 

- 리팩토링할 요소
    - ㅇㅇㅇ
    - ㅇㅇㅇ
      
### 교환일기

## 🧡 팀원 소개
<img width="708" alt="image" src="https://github.com/user-attachments/assets/7f33a5c7-176c-43ec-80ca-e5a28814c938">
