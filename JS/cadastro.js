const form = document.getElementById("petForm");

        const uploadArea = document.getElementById("uploadArea");

        const fileInput = document.getElementById("animalImage");

        const uploadContent =
            document.getElementById("uploadContent");

        const imagePreview =
            document.getElementById("imagePreview");

        const submitButton =
            document.getElementById("submitButton");

        const backButton =
            document.getElementById("backButton");


        /* ============================================
           ANIMAÇÃO INICIAL
        ============================================ */

        window.addEventListener("load", () => {

            document.body.classList.add("loaded");

            const rows =
                document.querySelectorAll(".form-row");

            rows.forEach((row, index) => {

                row.style.animationDelay =
                    `${index * 0.055}s`;

            });

        });


        /* ============================================
           INPUTS
        ============================================ */

        const inputs =
            document.querySelectorAll(
                "input[type='text'], input[type='number']"
            );

        inputs.forEach(input => {

            input.addEventListener("focus", () => {

                input.parentElement.classList.add(
                    "field-focused"
                );

            });


            input.addEventListener("blur", () => {

                input.parentElement.classList.remove(
                    "field-focused"
                );

            });


            input.addEventListener("input", () => {

                if (input.value.trim() !== "") {

                    input.classList.add("has-value");

                } else {

                    input.classList.remove("has-value");

                }

            });

        });


        /* ============================================
           UPLOAD DE IMAGEM
        ============================================ */

        uploadArea.addEventListener("click", () => {

            fileInput.click();

        });


        fileInput.addEventListener("change", event => {

            const file =
                event.target.files[0];

            if (file) {

                showImage(file);

            }

        });


        function showImage(file) {

            if (!file.type.startsWith("image/")) {

                showNotification(
                    "Selecione uma imagem válida."
                );

                return;

            }

            const reader =
                new FileReader();

            reader.onload = event => {

                imagePreview.src =
                    event.target.result;

                imagePreview.classList.add(
                    "visible"
                );

                uploadContent.classList.add(
                    "hidden"
                );

                uploadArea.classList.add(
                    "has-image"
                );

            };

            reader.readAsDataURL(file);

        }


        /* ============================================
           DRAG & DROP
        ============================================ */

        [
            "dragenter",
            "dragover"
        ].forEach(eventName => {

            uploadArea.addEventListener(
                eventName,
                event => {

                    event.preventDefault();

                    uploadArea.classList.add(
                        "dragging"
                    );

                }
            );

        });


        [
            "dragleave",
            "drop"
        ].forEach(eventName => {

            uploadArea.addEventListener(
                eventName,
                event => {

                    event.preventDefault();

                    uploadArea.classList.remove(
                        "dragging"
                    );

                }
            );

        });


        uploadArea.addEventListener(
            "drop",
            event => {

                const file =
                    event.dataTransfer.files[0];

                if (!file) return;

                fileInput.files =
                    event.dataTransfer.files;

                showImage(file);

            }
        );


        /* ============================================
           RADIO BUTTONS
        ============================================ */

        /* =========================================================
   RADIO BUTTONS COM TOGGLE
========================================================= */

const radioInputs =
    document.querySelectorAll(
        "input[type='radio']"
    );

radioInputs.forEach(radio => {

    radio.addEventListener("click", function (event) {

        /*
         * Guardamos o estado antes do clique.
         * Isso permite clicar novamente no mesmo
         * SIM/NÃO para desmarcar.
         */

        const estavaSelecionado =
            this.dataset.selected === "true";


        /*
         * Se já estava selecionado,
         * cancela a seleção.
         */

        if (estavaSelecionado) {

            event.preventDefault();

            this.checked = false;

            this.dataset.selected = "false";

            this
                .closest(".check-option")
                .classList.remove("selected");

            return;
        }


        /*
         * Remove a seleção dos outros
         * elementos do mesmo grupo.
         */

        const grupo =
            document.querySelectorAll(
                `input[name="${this.name}"]`
            );


        grupo.forEach(outro => {

            outro.dataset.selected = "false";

            outro
                .closest(".check-option")
                .classList.remove("selected");

        });


        /*
         * Seleciona o atual.
         */

        this.checked = true;

        this.dataset.selected = "true";

        this
            .closest(".check-option")
            .classList.add("selected");

    });

});

        radioInputs.forEach(radio => {

            radio.addEventListener(
                "change",
                () => {

                    const group =
                        document.querySelectorAll(
                            `input[name="${radio.name}"]`
                        );

                    group.forEach(item => {

                        item
                            .closest(".check-option")
                            .classList.remove(
                                "selected"
                            );

                    });


                    radio
                        .closest(".check-option")
                        .classList.add(
                            "selected"
                        );

                }
            );

        });


        /* ============================================
           ENVIO DO FORMULÁRIO
        ============================================ */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nome =
                    document.getElementById(
                        "nome"
                    );

                if (nome.value.trim() === "") {

                    nome.focus();

                    nome.classList.add(
                        "input-error"
                    );

                    setTimeout(() => {

                        nome.classList.remove(
                            "input-error"
                        );

                    }, 800);

                    showNotification(
                        "Informe o nome do seu pet 🐾"
                    );

                    return;

                }


                submitButton.classList.add(
                    "loading"
                );

                submitButton.innerHTML =
                    '<span class="loader"></span> Cadastrando...';


                setTimeout(() => {

                    submitButton.classList.remove(
                        "loading"
                    );

                    submitButton.innerHTML =
                        "✓ Pet cadastrado!";

                    submitButton.classList.add(
                        "success"
                    );

                    showNotification(
                        "Seu pet foi cadastrado com sucesso! 🐶❤️"
                    );


                    setTimeout(() => {

                        submitButton.innerHTML =
                            "Clique para cadastrar";

                        submitButton.classList.remove(
                            "success"
                        );

                    }, 2200);

                }, 1000);

            }
        );


        /* ============================================
           BOTÃO VOLTAR
        ============================================ */

        backButton.addEventListener(
            "click",
            () => {

                backButton.classList.add(
                    "clicked"
                );

                setTimeout(() => {

                    backButton.classList.remove(
                        "clicked"
                    );

                }, 300);


                if (window.history.length > 1) {

                    window.history.back();

                }

            }
        );


        /* ============================================
           MENU INFERIOR
        ============================================ */

        const navItems =
            document.querySelectorAll(
                ".nav-item"
            );

        navItems.forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    navItems.forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );

                    });


                    item.classList.add(
                        "active"
                    );


                    item.animate(
                        [
                            {
                                transform:
                                    "translateY(0) scale(1)"
                            },
                            {
                                transform:
                                    "translateY(-5px) scale(1.08)"
                            },
                            {
                                transform:
                                    "translateY(0) scale(1)"
                            }
                        ],
                        {
                            duration: 400,
                            easing:
                                "cubic-bezier(.2,.8,.2,1)"
                        }
                    );

                }
            );

        });


        /* ============================================
           NOTIFICAÇÃO
        ============================================ */

        function showNotification(message) {

            const old =
                document.querySelector(
                    ".notification"
                );

            if (old) old.remove();


            const notification =
                document.createElement("div");

            notification.className =
                "notification";

            notification.textContent =
                message;

            document.body.appendChild(
                notification
            );


            requestAnimationFrame(() => {

                notification.classList.add(
                    "show"
                );

            });


            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

                setTimeout(() => {

                    notification.remove();

                }, 300);

            }, 2500);

        }