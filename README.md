<p align=center><a href="https://gracewithmoon.tistory.com"><img src="./images/logo.png" height="256px" width="256px"></a></p>

# Description

저희는 세계여행을 하는 신혼부부 입니다. 세계를 여행하며 기록하고 싶은것들이 많아 티스토리 블로그 [혜달부부 지구별탐방기](https://gracewithmoon.tistory.com)를 운영하고 있습니다. 블로그를 운영하면서 기본 스킨에 아쉬운 점이 있어 자체 스킨을 개발하여 적용중입니다.

## About GraceWithMoon

저희 부부의 세계여행 이야기는 다음 채널을 통해 둘러보실 수 있습니다. 유튜브 채널은 매주 목요일 업데이트를 목표로 하고있습니다.

- Tistory - [혜달부부 지구별탐방기](https://gracewithmoon.tistory.com)
- Youtube 채널 - [혜달부부](https://www.youtube.com/channel/UC_4pVhScDyec_hZwQaFQuGw)
- Instargram 여행 일상 - [@grace_with_moon](https://www.instagram.com/grace_with_moon/)
- Instargram 수집품 보관함 - [@moon_with_grace](https://www.instagram.com/moon_with_grace/)

# Tistory Skin for GraceWithMoon

[티스토리](https://tistory.com)는 무료이면서도 기본적인 HTML, CSS, Javascript 지식만 있다면 만족스럽게 사용 가능한 블로그 플랫폼입니다. 하지만, 좀더 깊이 들어가면 플랫폼 종속적인 문제로 인해 한계가 드러나는 플랫폼 이기도 합니다.

## About This Project

티스토리 스킨 개발의 가장 큰 문제점은 치환자 였습니다. 인터넷이 환경이 좋지 않은 곳에서 작업하는 일이 빈번하므로 티스토리에서 기본으로 제공하는 개발환경은 사용하기 어려워 로컬 개발환경을 구축해야 했습니다. 해당 프로젝트는 다음 내용을 중점적으로 구축되었습니다.

- 로컬 개발/테스트 환경
- 티스토리 치환자 자동 치환
- HTML 분할구조
- Typescript 및 SASS(SCSS) 지원

## Tidory Framework

[Tidory Framework](http://www.tidory.com)는 [SangWoo Jeong](https://github.com/pronist)님께서 개발하고 관리하시는 티스토리 스킨 개발 프레임워크 입니다. [PUG](https://pugjs.org/)를 이용한 HTML 분할구조와 로컬 개발환경, 자동치환 및 티스토리 스킨 배포/관리까지 가능합니다.

# Initialize

해당 프로젝트는 **Tidory 7.3.x** 기반으로 생성되었으며, 내장 Webpack을 이용해 Typescript, SASS를 지원합니다.

## 1. Create Tidory Template

Tidory 프로젝트를 생성합니다.

```bash
# create project
$npm create-tidory-app ${project-name}
$cd ${project-name}
# install NPM Packages
$npm install
```

다음을 참고하여 tidory.config.js를 수정합니다. [링크](https://tidory.com/docs/configuration/)

```javascript
module.exports = {
    // Tistory login session
    ts_session: "COOKIES>TSSESSION",
    // Tistory blog url
    url: "https://gracewithmoon.tistory.com/",
    ...
}

```
## 2. Support Typescript

프로젝트에 Typescript를 설치합니다. Tidory 내장 Webpack 버전이 3.x 인 관계로 ts-loader 3.x 버전이 필요합니다.

```bash
# install typescript
$npm install --save-dev typescript ts-loader@^3
# initialize typescript
$npm tsc --init
```

tidory.config.js에 다음 내용을 추가합니다.

```javascript
module.exports = {
    ...

    /**
     * Webpack configuration extends
     */
    extends (webpackConfig) {
        webpackConfig.module.rules = [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            ...webpackConfig.module.rules
        ],
        webpackConfig.resolve = {
            extensions: [ '.tsx', '.ts', '.jsx', 'js' ],
            ...webpackConfig.resolve
        }
    }
}
```

assets/app.js에 .ts 파일을 import하면 Typescript를 사용할 수 있습니다. 
```javascript
// assets/app.js
import './${filename}.ts';
```

## 3. Support SASS

Typescrip 적용 방법과 동일합니다. NPM을 통해 SASS 패키지를 설치합니다. Webpack 3.x 버전 관계로 sass-loader 7.x 버전을 사용합니다.

```bash
$npm install --save-dev node-sass css-loader sass-loader@^7
```

tidory.config.js를 다음과 같이 수정합니다.

```javascript
module.exports = {
    ...

    /**
     * Webpack configuration extends
     */
    extends (webpackConfig) {
        webpackConfig.module.rules = [
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
            },
        {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        },
            ...webpackConfig.module.rules
        ],
        webpackConfig.resolve = {
            extensions: [ '.tsx', '.ts', '.jsx', 'js', '.sass', 'scss' ],
            ...webpackConfig.resolve
        }
    }
}
```

assets/app.js에 .sass 또는 .scss 파일을 import하면 SASS를 사용할 수 있습니다. 
```javascript
// assets/app.js
import './${filename}.sass';
```

# Usage

Tidory Framework 명령어를 통해 테스트 및 배포가 가능합니다. 다음 링크에서 자세한 사용법을 익힐 수 있습니다. [링크](https://tidory.com/docs/get-started/)

## 테스트

완전 로컬환경인 [라이브서버](http://localhost:8080/)와 티스토리 세션을 통한 [개발서버](http://localhost:3000/)를 지원합니다.

```bash
# 라이브서버 - 티스토리 치환자 치환되지 않음
$npm start

# 개발서버 - tistory.config.js 내 ts_session, url이 수정되어 있어야함
$npm run preview
```

## 빌드

티스토리 배포용 압축빌드와 외부 공개용 비압축 빌드를 생성할 수 있습니다.

```bash
# 압축 빌드
$npm run build

# 비압축 빌드
$npm run production
```

## 배포

적용중인 스킨에 바로 배포하기와 스킨 보관함에 배포하기를 지원합니다. tistory.config.js의 ts_session, url이 수정되어 있어야합니다.

```bash
# 스킨 바로적용
$npm run deploy

# 스킨보관함 배포
$npm run store
```

# Link

- [티도리 프레임워크](https://tidory.com/)
- [티스토리 스킨 가이드](https://tistory.github.io/document-tistory-skin/)
- [티스토리 API](https://tistory.github.io/document-tistory-apis/)
