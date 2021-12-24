function ablePlayerCustomizations($) {
    $(document).ready(function () {

        // Replace initDescription and handleTranscriptToggle methods with custom ones 
        // that add extra functionality
        AblePlayer.prototype.oldInitDescription = AblePlayer.prototype.initDescription;
        AblePlayer.prototype.oldHandleTranscriptToggle = AblePlayer.prototype.handleTranscriptToggle;

        // Add event listener for when fullscreen functionality is activated on AblePlayer
        document.addEventListener('fullscreenchange', fullScreenChangeHandler, true);
        
        // Ensure cookies that pause the video while audio descriptions are read are
        // set before audio description functionality is initialized.  After
        // initialization, adjust layout of page if transcript is visible.
        AblePlayer.prototype.initDescription = function () {
            setDescriptionCookies();
            this.oldInitDescription();
            adjustTranscriptVisibility(this);
        }

        // When transcript button is clicked, adjust layout of page.
        AblePlayer.prototype.handleTranscriptToggle = function () {
            this.oldHandleTranscriptToggle();
            adjustTranscriptVisibility(this);
        }

        // When transcript is visible, ensure proper CSS classes are 
        // set the DOM so that the video takes up half the screen
        // and that the transcript placed next to the video.
        function adjustTranscriptVisibility(player) {
            if (player.$transcriptDiv.is(':visible')) {
                player.$ableDiv.addClass('able-transcript-visible');
            } else {
                player.$ableDiv.removeClass('able-transcript-visible');
            }
        }
        
        // This ensures that the video is paused when audio descriptions are
        // being read out. 
        function setDescriptionCookies() {
            AblePlayerInstances.forEach((el) => {
                /* Ensure Audio Descriptions pause video when they are spoken */
                var playerCookie = el.getCookie();
                playerCookie.preferences.prefDescPause = 1;
                el.setCookie(playerCookie);
                el.prefDescPause = 1;
            });
        }

        // Override default Able Player controls icons
        window.AblePlayer.prototype.getSvgData = function (button) {
            // returns array of values for creating <svg> tag for specified button
            // 0 = <svg> viewBox attribute
            // 1 = <path> d (description) attribute
            var svg = Array();

            switch (button) {

                case 'play':
                    svg[0] = '0 0 24 24';
                    svg[1] = 'M4.42114 19.2902V4.80425C4.42114 4.01881 5.28509 3.53997 5.95114 3.95625L18.1498 11.5804C18.7937 11.9828 18.7718 12.9277 18.1101 13.3L5.9114 20.1617C5.2448 20.5367 4.42114 20.055 4.42114 19.2902Z';
                    break;

                case 'pause':
                    svg[0] = '0 0 24 24';
                    svg[1] = 'M0 .3C0 .137.137 0 .3 0h3.4c.163 0 .3.137.3.3v18.4c0 .163-.137.3-.3.3H.3a.303.303 0 01-.3-.3V.3zM10 .3c0-.163.137-.3.3-.3h3.4c.163 0 .3.137.3.3v18.4c0 .163-.137.3-.3.3h-3.4a.303.303 0 01-.3-.3V.3z';
                    break;

                case 'stop':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M0 18.036v-15.714q0-0.29 0.212-0.502t0.502-0.212h15.714q0.29 0 0.502 0.212t0.212 0.502v15.714q0 0.29-0.212 0.502t-0.502 0.212h-15.714q-0.29 0-0.502-0.212t-0.212-0.502z';
                    break;

                case 'restart':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M18 8h-6l2.243-2.243c-1.133-1.133-2.64-1.757-4.243-1.757s-3.109 0.624-4.243 1.757c-1.133 1.133-1.757 2.64-1.757 4.243s0.624 3.109 1.757 4.243c1.133 1.133 2.64 1.757 4.243 1.757s3.109-0.624 4.243-1.757c0.095-0.095 0.185-0.192 0.273-0.292l1.505 1.317c-1.466 1.674-3.62 2.732-6.020 2.732-4.418 0-8-3.582-8-8s3.582-8 8-8c2.209 0 4.209 0.896 5.656 2.344l2.344-2.344v6z';
                    break;

                case 'rewind':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M11.25 3.125v6.25l6.25-6.25v13.75l-6.25-6.25v6.25l-6.875-6.875z';
                    break;

                case 'forward':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10 16.875v-6.25l-6.25 6.25v-13.75l6.25 6.25v-6.25l6.875 6.875z';
                    break;

                case 'previous':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M5 17.5v-15h2.5v6.875l6.25-6.25v13.75l-6.25-6.25v6.875z';
                    break;

                case 'next':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M15 2.5v15h-2.5v-6.875l-6.25 6.25v-13.75l6.25 6.25v-6.875z';
                    break;

                case 'slower':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M0 7.321q0-0.29 0.212-0.502t0.502-0.212h10q0.29 0 0.502 0.212t0.212 0.502-0.212 0.502l-5 5q-0.212 0.212-0.502 0.212t-0.502-0.212l-5-5q-0.212-0.212-0.212-0.502z';
                    break;

                case 'faster':
                    svg[0] = '0 0 11 20';
                    svg[1] = 'M0 12.411q0-0.29 0.212-0.502l5-5q0.212-0.212 0.502-0.212t0.502 0.212l5 5q0.212 0.212 0.212 0.502t-0.212 0.502-0.502 0.212h-10q-0.29 0-0.502-0.212t-0.212-0.502z';
                    break;

                case 'turtle':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M17.212 3.846c-0.281-0.014-0.549 0.025-0.817 0.144-1.218 0.542-1.662 2.708-2.163 3.942-1.207 2.972-7.090 4.619-11.755 5.216-0.887 0.114-1.749 0.74-2.428 1.466 0.82-0.284 2.126-0.297 2.74 0.144 0.007 0.488-0.376 1.062-0.625 1.37-0.404 0.5-0.398 0.793 0.12 0.793 0.473 0 0.752 0.007 1.635 0 0.393-0.003 0.618-0.16 1.49-1.49 3.592 0.718 5.986-0.264 5.986-0.264s0.407 1.755 1.418 1.755h1.49c0.633 0 0.667-0.331 0.625-0.433-0.448-1.082-0.68-1.873-0.769-2.5-0.263-1.857 0.657-3.836 2.524-5.457 0.585 0.986 2.253 0.845 2.909-0.096s0.446-2.268-0.192-3.221c-0.49-0.732-1.345-1.327-2.188-1.37zM8.221 4.663c-0.722-0.016-1.536 0.111-2.5 0.409-4.211 1.302-4.177 4.951-3.51 5.745 0 0-0.955 0.479-0.409 1.274 0.448 0.652 3.139 0.191 5.409-0.529s4.226-1.793 5.312-2.692c0.948-0.785 0.551-2.106-0.505-1.947-0.494-0.98-1.632-2.212-3.798-2.26zM18.846 5.962c0.325 0 0.577 0.252 0.577 0.577s-0.252 0.577-0.577 0.577c-0.325 0-0.577-0.252-0.577-0.577s0.252-0.577 0.577-0.577z';
                    break;

                case 'rabbit':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10.817 0c-2.248 0-1.586 0.525-1.154 0.505 1.551-0.072 5.199 0.044 6.851 2.428 0 0-1.022-2.933-5.697-2.933zM10.529 0.769c-2.572 0-2.837 0.51-2.837 1.106 0 0.545 1.526 0.836 2.524 0.697 2.778-0.386 4.231-0.12 5.264 0.865-1.010 0.779-0.75 1.401-1.274 1.851-1.093 0.941-2.643-0.673-4.976-0.673-2.496 0-4.712 1.92-4.712 4.76-0.157-0.537-0.769-0.913-1.442-0.913-0.974 0-1.514 0.637-1.514 1.49 0 0.769 1.13 1.791 2.861 0.938 0.499 1.208 2.265 1.364 2.452 1.418 0.538 0.154 1.875 0.098 1.875 0.865 0 0.794-1.034 1.094-1.034 1.707 0 1.070 1.758 0.873 2.284 1.034 1.683 0.517 2.103 1.214 2.788 2.212 0.771 1.122 2.572 1.408 2.572 0.625 0-3.185-4.413-4.126-4.399-4.135 0.608-0.382 2.139-1.397 2.139-3.534 0-1.295-0.703-2.256-1.755-2.861 1.256 0.094 2.572 1.205 2.572 2.74 0 1.877-0.653 2.823-0.769 2.957 1.975-1.158 3.193-3.91 3.029-6.37 0.61 0.401 1.27 0.577 1.971 0.625 0.751 0.052 1.475-0.225 1.635-0.529 0.38-0.723 0.162-2.321-0.12-2.837-0.763-1.392-2.236-1.73-3.606-1.683-1.202-1.671-3.812-2.356-5.529-2.356zM1.37 3.077l-0.553 1.538h3.726c0.521-0.576 1.541-1.207 2.284-1.538h-5.457zM18.846 5.192c0.325 0 0.577 0.252 0.577 0.577s-0.252 0.577-0.577 0.577c-0.325 0-0.577-0.252-0.577-0.577s0.252-0.577 0.577-0.577zM0.553 5.385l-0.553 1.538h3.197c0.26-0.824 0.586-1.328 0.769-1.538h-3.413z';
                    break;

                case 'ellipsis':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2zM3.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.986 2.199-2.2s-0.984-2.2-2.199-2.2zM17.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2z';
                    break;

                case 'pipe':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10.15 0.179h0.623c0.069 0 0.127 0.114 0.127 0.253v19.494c0 0.139-0.057 0.253-0.127 0.253h-1.247c-0.069 0-0.126-0.114-0.126-0.253v-19.494c0-0.139 0.057-0.253 0.126-0.253h0.623z';
                    break;

                case 'captions':
                    svg[0] = '0 0 24 24';
                    svg[1] = 'M8.25232245,11.7861702 L8.25222245,11.7861702 C7.16752245,11.5627702 6.07252245,10.4924702 6.00372245,9.08677023 C5.93002245,7.55467023 6.96302245,6.45368023 8.00802245,6.13096023 L8.00822245,6.13091023 C9.09782245,5.79404023 10.2020224,6.12577023 10.9390224,6.91397023 C10.9054224,6.93677023 10.8719224,6.95957023 10.8383224,6.98237023 C10.2947224,6.39654023 9.58832245,6.12241023 8.76502245,6.14826023 L8.76462245,6.14828023 C7.97932245,6.17348023 7.33192245,6.50368023 6.81912245,7.06807023 C5.86482245,8.11797023 5.85752245,9.94857023 7.05922245,11.0320702 L7.06012245,11.0328702 C8.01472245,11.8896702 9.77942245,12.0109702 10.8435224,10.8720702 C10.8685224,10.8890702 10.8936224,10.9061702 10.9187224,10.9232702 C10.9257224,10.9279702 10.9327224,10.9326702 10.9396224,10.9374702 C10.3468224,11.5752702 9.37122245,12.0167702 8.25232245,11.7861702 Z M15.08,11.8621 L15.0799,11.8621 C13.9952,11.6387 12.9002,10.5684 12.8314,9.1627 C12.7577,7.6306 13.7907,6.52961 14.8357,6.20689 L14.8359,6.20684 C15.9255,5.86997 17.0297,6.2017 17.7667,6.9899 C17.7331,7.0127 17.6996,7.0355 17.666,7.0583 C17.1224,6.47247 16.416,6.19834 15.5927,6.22419 L15.5923,6.22421 C14.807,6.24941 14.1596,6.57961 13.6468,7.144 C12.6925,8.1939 12.6852,10.0245 13.8869,11.108 L13.8878,11.1088 C14.8424,11.9656 16.6071,12.0869 17.6712,10.948 C17.6962,10.965 17.7213,10.9821 17.7464,10.9992 C17.7534,11.0039 17.7604,11.0086 17.7673,11.0134 C17.1745,11.6512 16.1989,12.0927 15.08,11.8621 Z M0.774194,0.5968 L23.2258,0.5968 C23.3772,0.5968 23.5,0.71956 23.5,0.871 L23.5,17.1291 C23.5,17.2805 23.3772,17.4033 23.2258,17.4033 L0.774194,17.4033 C0.622761,17.4033 0.5,17.2805 0.5,17.1291 L0.5,0.871 C0.5,0.71956 0.62276,0.5968 0.774194,0.5968 Z M22.01611,1 L1.88709,1 C1.39716,1 1,1.39717 1,1.8871 L1,15.82261 C1,16.31251 1.39716,16.70971 1.88709,16.70971 L22.01611,16.70971 C22.50601,16.70971 22.90321,16.31251 22.90321,15.82261 L22.90321,1.8871 C22.90321,1.39717 22.50601,1 22.01611,1 Z';
                    break;

                case 'descriptions':
                    svg[0] = '0 0 24 24';
                    svg[1] = `M19.234 4.78063C19.1363 4.67033 19.1368 4.50331 19.238 4.39618C19.5838 4.03039 19.9207 3.67691 20.2562 3.32542C20.3635 3.21302 20.542 3.20902 20.6509 3.31989C24.8654 7.61173 25.3491 15.6867 20.6832 20.6747C20.575 20.7904 20.3915 20.7896 20.2823 20.6748C19.9443 20.3197 19.6073 19.963 19.2589 19.5971C19.1568 19.4899 19.1557 19.3219 19.2539 19.211C21.0284 17.2062 21.9812 14.7956 21.9812 12.0031C21.9812 9.22158 21.0331 6.81011 19.234 4.78063Z 
                    M16.4039 7.7655C16.3079 7.65316 16.3089 7.4857 16.411 7.3788C16.7608 7.01246 17.0988 6.65848 17.4349 6.30648C17.5417 6.19457 17.7194 6.18992 17.8269 6.30127C20.5442 9.1174 20.8588 14.4102 17.8653 17.6853C17.7585 17.8021 17.5754 17.8007 17.4661 17.6863C17.1272 17.3313 16.7887 16.9768 16.436 16.6073C16.3339 16.5005 16.3328 16.3332 16.4286 16.2207C17.417 15.0604 17.9669 13.6444 17.9669 12.0227C17.9669 10.3857 17.4264 8.96108 16.4039 7.7655Z 
                    M5.22761 19.7743C10.1477 19.7743 12.9941 16.7229 12.9941 11.6767C12.9941 6.65406 10.1477 3.62631 5.39319 3.62631H0.280466C0.125569 3.62631 0 3.75188 0 3.90677V19.4939C0 19.6488 0.125569 19.7743 0.280466 19.7743H5.22761ZM2.71686 17.6454C2.56196 17.6454 2.4364 17.5199 2.4364 17.365V6.03567C2.4364 5.88077 2.56196 5.7552 2.71686 5.7552H5.24338C8.77575 5.7552 10.5971 7.86832 10.5971 11.6767C10.5971 15.5008 8.77575 17.6454 5.09357 17.6454H2.71686Z`
                    break;

                case 'sign':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10.954 10.307c0.378 0.302 0.569 1.202 0.564 1.193 0.697 0.221 1.136 0.682 1.136 0.682 1.070-0.596 1.094-0.326 1.558-0.682 0.383-0.263 0.366-0.344 0.567-1.048 0.187-0.572-0.476-0.518-1.021-1.558-0.95 0.358-1.463 0.196-1.784 0.167-0.145-0.020-0.12 0.562-1.021 1.247zM14.409 17.196c-0.133 0.182-0.196 0.218-0.363 0.454-0.28 0.361 0.076 0.906 0.253 0.82 0.206-0.076 0.341-0.488 0.567-0.623 0.115-0.061 0.422-0.513 0.709-0.82 0.211-0.238 0.363-0.344 0.564-0.594 0.341-0.422 0.412-0.744 0.709-1.193 0.184-0.236 0.312-0.307 0.481-0.594 0.886-1.679 0.628-2.432 1.475-3.629 0.26-0.353 0.552-0.442 0.964-0.653 0.383-2.793-0.888-4.356-0.879-4.361-1.067 0.623-1.644 0.879-2.751 0.82-0.417-0.005-0.636-0.182-1.048-0.145-0.385 0.015-0.582 0.159-0.964 0.29-0.589 0.182-0.91 0.344-1.529 0.535-0.393 0.11-0.643 0.115-1.050 0.255-0.348 0.147-0.182 0.029-0.427 0.312-0.317 0.348-0.238 0.623-0.535 1.222-0.371 0.785-0.326 0.891-0.115 0.987-0.14 0.402-0.174 0.672-0.14 1.107 0.039 0.331-0.101 0.562 0.255 0.825 0.483 0.361 1.499 1.205 1.757 1.217 0.39-0.012 1.521 0.029 2.096-0.368 0.13-0.081 0.167-0.162 0.056 0.145-0.022 0.037-1.433 1.136-1.585 1.131-1.794 0.056-1.193 0.157-1.303 0.115-0.091 0-0.955-1.055-1.477-0.682-0.196 0.12-0.287 0.236-0.363 0.452 0.066 0.137 0.383 0.358 0.675 0.54 0.422 0.27 0.461 0.552 0.881 0.653 0.513 0.115 1.060 0.039 1.387 0.081 0.125 0.034 1.256-0.297 1.961-0.675 0.65-0.336-0.898 0.648-1.276 1.131-1.141 0.358-0.82 0.373-1.362 0.483-0.503 0.115-0.479 0.086-0.822 0.196-0.356 0.086-0.648 0.572-0.312 0.825 0.201 0.167 0.827-0.066 1.445-0.086 0.275-0.005 1.391-0.518 1.644-0.653 0.633-0.339 1.099-0.81 1.472-1.077 0.518-0.361-0.584 0.991-1.050 1.558zM8.855 9.799c-0.378-0.312-0.569-1.212-0.564-1.217-0.697-0.206-1.136-0.667-1.136-0.653-1.070 0.582-1.099 0.312-1.558 0.653-0.388 0.277-0.366 0.363-0.567 1.045-0.187 0.594 0.471 0.535 1.021 1.561 0.95-0.344 1.463-0.182 1.784-0.142 0.145 0.010 0.12-0.572 1.021-1.247zM5.4 2.911c0.133-0.191 0.196-0.228 0.368-0.454 0.27-0.371-0.081-0.915-0.253-0.849-0.211 0.096-0.346 0.508-0.599 0.653-0.093 0.052-0.4 0.503-0.682 0.82-0.211 0.228-0.363 0.334-0.564 0.599-0.346 0.407-0.412 0.729-0.709 1.161-0.184 0.258-0.317 0.324-0.481 0.621-0.886 1.669-0.631 2.422-1.475 3.6-0.26 0.38-0.552 0.461-0.964 0.682-0.383 2.788 0.883 4.346 0.879 4.336 1.068-0.609 1.639-0.861 2.751-0.825 0.417 0.025 0.636 0.201 1.048 0.174 0.385-0.025 0.582-0.169 0.964-0.285 0.589-0.196 0.91-0.358 1.499-0.54 0.422-0.12 0.672-0.125 1.080-0.285 0.348-0.128 0.182-0.010 0.427-0.282 0.312-0.358 0.238-0.633 0.508-1.217 0.398-0.8 0.353-0.906 0.142-0.991 0.135-0.412 0.174-0.677 0.14-1.107-0.044-0.336 0.101-0.572-0.255-0.82-0.483-0.375-1.499-1.22-1.752-1.222-0.395 0.002-1.526-0.039-2.101 0.339-0.13 0.101-0.167 0.182-0.056-0.11 0.022-0.052 1.433-1.148 1.585-1.163 1.794-0.039 1.193-0.14 1.303-0.088 0.091-0.007 0.955 1.045 1.477 0.682 0.191-0.13 0.287-0.245 0.368-0.452-0.071-0.147-0.388-0.368-0.68-0.537-0.422-0.282-0.464-0.564-0.881-0.655-0.513-0.125-1.065-0.049-1.387-0.11-0.125-0.015-1.256 0.317-1.956 0.68-0.66 0.351 0.893-0.631 1.276-1.136 1.136-0.339 0.81-0.353 1.36-0.479 0.501-0.101 0.476-0.071 0.82-0.172 0.351-0.096 0.648-0.577 0.312-0.849-0.206-0.152-0.827 0.081-1.44 0.086-0.28 0.020-1.396 0.533-1.649 0.677-0.633 0.329-1.099 0.8-1.472 1.048-0.523 0.38 0.584-0.967 1.050-1.529z';
                    break;

                case 'mute':
                case 'volume-mute':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M7.839 1.536c0.501-0.501 0.911-0.331 0.911 0.378v16.172c0 0.709-0.41 0.879-0.911 0.378l-4.714-4.713h-3.125v-7.5h3.125l4.714-4.714zM18.75 12.093v1.657h-1.657l-2.093-2.093-2.093 2.093h-1.657v-1.657l2.093-2.093-2.093-2.093v-1.657h1.657l2.093 2.093 2.093-2.093h1.657v1.657l-2.093 2.093z';
                    break;

                case 'volume-soft':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M10.723 14.473c-0.24 0-0.48-0.092-0.663-0.275-0.366-0.366-0.366-0.96 0-1.326 1.584-1.584 1.584-4.161 0-5.745-0.366-0.366-0.366-0.96 0-1.326s0.96-0.366 1.326 0c2.315 2.315 2.315 6.082 0 8.397-0.183 0.183-0.423 0.275-0.663 0.275zM7.839 1.536c0.501-0.501 0.911-0.331 0.911 0.378v16.172c0 0.709-0.41 0.879-0.911 0.378l-4.714-4.713h-3.125v-7.5h3.125l4.714-4.714z';
                    break;

                case 'volume-medium':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M14.053 16.241c-0.24 0-0.48-0.092-0.663-0.275-0.366-0.366-0.366-0.96 0-1.326 2.559-2.559 2.559-6.722 0-9.281-0.366-0.366-0.366-0.96 0-1.326s0.96-0.366 1.326 0c1.594 1.594 2.471 3.712 2.471 5.966s-0.878 4.373-2.471 5.966c-0.183 0.183-0.423 0.275-0.663 0.275zM10.723 14.473c-0.24 0-0.48-0.092-0.663-0.275-0.366-0.366-0.366-0.96 0-1.326 1.584-1.584 1.584-4.161 0-5.745-0.366-0.366-0.366-0.96 0-1.326s0.96-0.366 1.326 0c2.315 2.315 2.315 6.082 0 8.397-0.183 0.183-0.423 0.275-0.663 0.275zM7.839 1.536c0.501-0.501 0.911-0.331 0.911 0.378v16.172c0 0.709-0.41 0.879-0.911 0.378l-4.714-4.713h-3.125v-7.5h3.125l4.714-4.714z';
                    break;

                case 'volume-loud':
                    svg[0] = '0 0 24 24';
                    svg[1] = `M19.2424 4.6424C19.1304 4.5151 19.1309 4.32297 19.2474 4.1998C19.5587 3.87061 19.8628 3.55149 20.1655 3.23435C20.2889 3.10507 20.4942 3.10043 20.6188 3.22858C24.6566 7.38321 25.1175 15.1417 20.6502 19.9612C20.5263 20.0948 20.3154 20.0937 20.1898 19.9617C19.8853 19.6416 19.5812 19.3199 19.268 18.9907C19.1506 18.8674 19.1494 18.6742 19.2618 18.5462C20.96 16.6117 21.8714 14.2892 21.8714 11.6014C21.8714 8.92393 20.9643 6.60046 19.2424 4.6424Z
                    M16.5008 7.53371C16.3912 7.40377 16.3923 7.21133 16.5097 7.08839C16.8246 6.75859 17.1299 6.43889 17.4332 6.12117C17.5561 5.99246 17.7606 5.98707 17.8832 6.1161C20.4717 8.84135 20.769 13.9053 17.9205 17.0657C17.7986 17.2009 17.5881 17.1991 17.4624 17.0675C17.1568 16.7474 16.8511 16.4273 16.5339 16.095C16.4166 15.9721 16.4154 15.7798 16.5246 15.6497C17.4625 14.5328 17.9837 13.1741 17.9837 11.6204C17.9837 10.0516 17.471 8.68411 16.5008 7.53371Z
                    M0.433668 16.8506C0.290071 16.8427 0.17334 16.7297 0.17334 16.5859C0.17334 13.5243 0.17334 10.4848 0.17334 7.42708C0.17334 7.27788 0.294291 7.15692 0.443492 7.15692C1.73531 7.15692 3.03204 7.16125 4.32386 7.1526C4.45157 7.1526 4.60875 7.09204 4.70207 7.01418C6.17072 5.72947 7.63445 4.44043 9.09818 3.14707C9.21115 3.04326 9.31921 3 9.48131 3C10.4468 3.0039 11.4122 3.00428 12.3957 3.00432C12.5738 3.00433 12.7182 3.14874 12.7182 3.32688C12.7182 9.14306 12.7182 14.9555 12.7182 20.7841C12.7182 20.8979 12.6306 20.9989 12.5168 20.9989C11.4952 20.9989 10.4686 21.0032 9.44692 20.9946C9.33395 20.9946 9.19642 20.934 9.11292 20.8648C7.64918 19.5844 6.19036 18.2997 4.73645 17.015C4.60383 16.8982 4.48104 16.8463 4.28948 16.8463C3.00257 16.855 1.72057 16.8506 0.433668 16.8506Z`;
                    break;

                case 'chapters':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M5 2.5v17.5l6.25-6.25 6.25 6.25v-17.5zM15 0h-12.5v17.5l1.25-1.25v-15h11.25z';
                    break;

                case 'transcript':
                    svg[0] = '0 0 24 24';
                    svg[1] = `M4.34033 3.70213V20.2979C4.34033 21.2379 5.1024 22 6.04246 22H17.9574C18.8974 22 19.6595 21.2379 19.6595 20.2979V7.10638L14.5531 2H6.04246C5.1024 2 4.34033 2.76207 4.34033 3.70213ZM6.46799 20.7234H17.5318C18.0019 20.7234 18.3829 20.3424 18.3829 19.8723V7.53192H15.4042C14.6991 7.53192 14.1276 6.96036 14.1276 6.25532V3.2766H6.46799C5.99796 3.2766 5.61693 3.65763 5.61693 4.12766V19.8723C5.61693 20.3424 5.99796 20.7234 6.46799 20.7234Z 
                    M7.96516 10.5817C7.96516 10.5424 7.99695 10.5107 8.03617 10.5107H9.07769C9.11691 10.5107 9.14871 10.5424 9.14871 10.5817V11.1498C9.14871 11.189 9.11691 11.2208 9.07769 11.2208H8.03617C7.99695 11.2208 7.96516 11.189 7.96516 11.1498V10.5817Z
                    M7.96504 13.4194C7.96504 13.3802 7.99683 13.3484 8.03605 13.3484H9.07758C9.1168 13.3484 9.14859 13.3802 9.14859 13.4194V13.9875C9.14859 14.0267 9.1168 14.0585 9.07758 14.0585H8.03605C7.99683 14.0585 7.96504 14.0267 7.96504 13.9875V13.4194Z
                    M7.96504 16.2571C7.96504 16.2179 7.99683 16.1861 8.03605 16.1861H9.07758C9.1168 16.1861 9.14859 16.2179 9.14859 16.2571V16.8252C9.14859 16.8645 9.1168 16.8963 9.07758 16.8963H8.03605C7.99683 16.8963 7.96504 16.8645 7.96504 16.8252V16.2571Z
                    M9.99982 10.5817C9.99982 10.5424 10.0316 10.5106 10.0708 10.5106H15.6099C15.6491 10.5106 15.6809 10.5424 15.6809 10.5817V11.1498C15.6809 11.189 15.6491 11.2208 15.6099 11.2208H10.0708C10.0316 11.2208 9.99982 11.189 9.99982 11.1498V10.5817Z
                    M9.99982 13.4194C9.99982 13.3802 10.0316 13.3484 10.0708 13.3484H15.6099C15.6491 13.3484 15.6809 13.3802 15.6809 13.4194V13.9875C15.6809 14.0267 15.6491 14.0585 15.6099 14.0585H10.0708C10.0316 14.0585 9.99982 14.0267 9.99982 13.9875V13.4194Z
                    M9.99982 16.2571C9.99982 16.2179 10.0316 16.1861 10.0708 16.1861H15.6099C15.6491 16.1861 15.6809 16.2179 15.6809 16.2571V16.8252C15.6809 16.8645 15.6491 16.8963 15.6099 16.8963H10.0708C10.0316 16.8963 9.99982 16.8645 9.99982 16.8252V16.2571Z`;
                    break;

                case 'preferences':
                    svg[0] = '0 0 20 20';
                    svg[1] = 'M18.238 11.919c-1.049-1.817-0.418-4.147 1.409-5.205l-1.965-3.404c-0.562 0.329-1.214 0.518-1.911 0.518-2.1 0-3.803-1.714-3.803-3.828h-3.931c0.005 0.653-0.158 1.314-0.507 1.919-1.049 1.818-3.382 2.436-5.212 1.382l-1.965 3.404c0.566 0.322 1.056 0.793 1.404 1.396 1.048 1.815 0.42 4.139-1.401 5.2l1.965 3.404c0.56-0.326 1.209-0.513 1.902-0.513 2.094 0 3.792 1.703 3.803 3.808h3.931c-0.002-0.646 0.162-1.3 0.507-1.899 1.048-1.815 3.375-2.433 5.203-1.387l1.965-3.404c-0.562-0.322-1.049-0.791-1.395-1.391zM10 14.049c-2.236 0-4.050-1.813-4.050-4.049s1.813-4.049 4.050-4.049 4.049 1.813 4.049 4.049c-0 2.237-1.813 4.049-4.049 4.049z';
                    break;

                case 'close':
                    svg[0] = '0 0 16 20';
                    svg[1] = 'M1.228 14.933q0-0.446 0.312-0.759l3.281-3.281-3.281-3.281q-0.313-0.313-0.313-0.759t0.313-0.759l1.518-1.518q0.313-0.313 0.759-0.313t0.759 0.313l3.281 3.281 3.281-3.281q0.313-0.313 0.759-0.313t0.759 0.313l1.518 1.518q0.313 0.313 0.313 0.759t-0.313 0.759l-3.281 3.281 3.281 3.281q0.313 0.313 0.313 0.759t-0.313 0.759l-1.518 1.518q-0.313 0.313-0.759 0.313t-0.759-0.313l-3.281-3.281-3.281 3.281q-0.313 0.313-0.759 0.313t-0.759-0.313l-1.518-1.518q-0.313-0.313-0.313-0.759z';
                    break;

                case 'fullscreen-expand':
                    svg[0] = '0 0 24 24';
                    svg[1] = `M13.9565 4.30807V3.25714C13.9565 3.11513 14.0716 3 14.2137 3L20.7429 3C20.8849 3 21 3.11513 21 3.25714L21 9.78634C21 9.92835 20.8849 10.0435 20.7429 10.0435H19.6919C19.5499 10.0435 19.4348 9.92835 19.4348 9.78634L19.4348 4.82236C19.4348 4.68034 19.3197 4.56522 19.1776 4.56522L14.2137 4.56522C14.0716 4.56522 13.9565 4.45009 13.9565 4.30807Z 
                    M19.6919 13.9565H20.7429C20.8849 13.9565 21 14.0716 21 14.2137L21 20.7429C21 20.8849 20.8849 21 20.7429 21L14.2137 21C14.0716 21 13.9565 20.8849 13.9565 20.7429L13.9565 19.6919C13.9565 19.5499 14.0716 19.4348 14.2137 19.4348L19.1776 19.4348C19.3197 19.4348 19.4348 19.3197 19.4348 19.1776V14.2137C19.4348 14.0716 19.5499 13.9565 19.6919 13.9565Z 
                    M10.0435 19.6919V20.7429C10.0435 20.8849 9.92835 21 9.78634 21H3.25715C3.11513 21 3.00001 20.8849 3.00001 20.7429L3 14.2137C3 14.0716 3.11513 13.9565 3.25714 13.9565H4.30807C4.45009 13.9565 4.56522 14.0716 4.56522 14.2137L4.56522 19.1776C4.56522 19.3197 4.68035 19.4348 4.82236 19.4348H9.78634C9.92835 19.4348 10.0435 19.5499 10.0435 19.6919Z 
                    M4.30808 10.0435H3.25714C3.11513 10.0435 3 9.92835 3 9.78634L3 3.25715C3 3.11513 3.11513 3.00001 3.25714 3.00001L9.78634 3C9.92835 3 10.0435 3.11513 10.0435 3.25714V4.30808C10.0435 4.45009 9.92835 4.56522 9.78634 4.56522L4.82236 4.56522C4.68035 4.56522 4.56522 4.68035 4.56522 4.82237L4.56522 9.78634C4.56522 9.92835 4.45009 10.0435 4.30808 10.0435Z`;
                    break;

                case 'fullscreen-collapse':
                    svg[0] = '0 0 24 24';
                    svg[1] = `M13.9565 4.30807V3.25714C13.9565 3.11513 14.0716 3 14.2137 3L20.7429 3C20.8849 3 21 3.11513 21 3.25714L21 9.78634C21 9.92835 20.8849 10.0435 20.7429 10.0435H19.6919C19.5499 10.0435 19.4348 9.92835 19.4348 9.78634L19.4348 4.82236C19.4348 4.68034 19.3197 4.56522 19.1776 4.56522L14.2137 4.56522C14.0716 4.56522 13.9565 4.45009 13.9565 4.30807Z 
                    M19.6919 13.9565H20.7429C20.8849 13.9565 21 14.0716 21 14.2137L21 20.7429C21 20.8849 20.8849 21 20.7429 21L14.2137 21C14.0716 21 13.9565 20.8849 13.9565 20.7429L13.9565 19.6919C13.9565 19.5499 14.0716 19.4348 14.2137 19.4348L19.1776 19.4348C19.3197 19.4348 19.4348 19.3197 19.4348 19.1776V14.2137C19.4348 14.0716 19.5499 13.9565 19.6919 13.9565Z 
                    M10.0435 19.6919V20.7429C10.0435 20.8849 9.92835 21 9.78634 21H3.25715C3.11513 21 3.00001 20.8849 3.00001 20.7429L3 14.2137C3 14.0716 3.11513 13.9565 3.25714 13.9565H4.30807C4.45009 13.9565 4.56522 14.0716 4.56522 14.2137L4.56522 19.1776C4.56522 19.3197 4.68035 19.4348 4.82236 19.4348H9.78634C9.92835 19.4348 10.0435 19.5499 10.0435 19.6919Z 
                    M4.30808 10.0435H3.25714C3.11513 10.0435 3 9.92835 3 9.78634L3 3.25715C3 3.11513 3.11513 3.00001 3.25714 3.00001L9.78634 3C9.92835 3 10.0435 3.11513 10.0435 3.25714V4.30808C10.0435 4.45009 9.92835 4.56522 9.78634 4.56522L4.82236 4.56522C4.68035 4.56522 4.56522 4.68035 4.56522 4.82237L4.56522 9.78634C4.56522 9.92835 4.45009 10.0435 4.30808 10.0435Z`;
                    break;

                case 'help':
                    svg[0] = '0 0 11 20';
                    svg[1] = 'M0.577 6.317q-0.028-0.167 0.061-0.313 1.786-2.969 5.179-2.969 0.893 0 1.797 0.346t1.629 0.926 1.183 1.423 0.458 1.769q0 0.603-0.173 1.127t-0.391 0.854-0.614 0.664-0.642 0.485-0.681 0.396q-0.458 0.257-0.765 0.725t-0.307 0.748q0 0.19-0.134 0.363t-0.313 0.173h-2.679q-0.167 0-0.285-0.206t-0.117-0.419v-0.502q0-0.926 0.725-1.747t1.596-1.211q0.658-0.301 0.938-0.625t0.279-0.848q0-0.469-0.519-0.826t-1.2-0.357q-0.725 0-1.205 0.324-0.391 0.279-1.194 1.283-0.145 0.179-0.346 0.179-0.134 0-0.279-0.089l-1.83-1.395q-0.145-0.112-0.173-0.279zM3.786 16.875v-2.679q0-0.179 0.134-0.313t0.313-0.134h2.679q0.179 0 0.313 0.134t0.134 0.313v2.679q0 0.179-0.134 0.313t-0.313 0.134h-2.679q-0.179 0-0.313-0.134t-0.134-0.313z';
                    break;
            }

            return svg;
        };
    });

    // Adjust layout when video full screen functionality is activated.
    function fullScreenChangeHandler(e) {
        if (document.fullscreenElement) {
            document.fullscreenElement.classList.add('is-fullscreen');
        } else {
            document.querySelector('.is-fullscreen').classList.remove('is-fullscreen');
        }
    }

}

ablePlayerCustomizations(jQuery);