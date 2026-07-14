/*=========================================
SUBTLE REVEAL
=========================================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach((element) => {
  ScrollTrigger.create({
    trigger: element,

    start: "top 85%",

    end: "bottom 15%",

    onEnter: () => {
      gsap.fromTo(
        element,

        {
          y: 30,
          opacity: 0,
          filter: "blur(8px)",
        },

        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",

          duration: 0.9,

          ease: "power2.out",
        },
      );
    },

    onLeaveBack: () => {
      gsap.set(element, {
        y: 30,

        opacity: 0,

        filter: "blur(8px)",
      });
    },
  });
});

/*=========================================
CLIENTELE HEADER
=========================================*/

gsap.from(".clientele .section-header", {
  y: 25,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".clientele",
    start: "top 75%",
    toggleActions: "play none none reset",
  },
});

gsap.from(".clientele-left", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".clientele-left",
    start: "top 80%",
    toggleActions: "play none none reset",
  },
});

/*=========================================
BRAND CARDS
=========================================*/

gsap.from(".brand-card", {
  y: 40,

  opacity: 0,

  scale: 0.96,

  duration: 0.7,

  stagger: {
    amount: 0.45,
    from: "start",
  },

  ease: "power2.out",

  scrollTrigger: {
    trigger: ".brand-wall",

    start: "top 80%",

    toggleActions: "play none none reset",
  },
});

/*=========================================
PAPER TILT
=========================================*/

document.querySelectorAll(".brand-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x - rect.width / 2) / 18;

    const rotateX = -(y - rect.height / 2) / 18;

    gsap.to(card, {
      rotationX: rotateX,

      rotationY: rotateY,

      transformPerspective: 800,

      transformOrigin: "center",

      duration: 0.35,

      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,

      rotationY: 0,

      duration: 0.5,

      ease: "power2.out",
    });
  });
});

/*=========================================
DECORATIONS
=========================================*/

gsap.utils.toArray(".client-star, .client-spark").forEach((el) => {
  gsap.to(el, {
    y: gsap.utils.random(-12, 12),

    x: gsap.utils.random(-6, 6),

    rotation: gsap.utils.random(-8, 8),

    duration: gsap.utils.random(3, 5),

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });
});

gsap.to(".paperclip", {
  rotation: 22,

  duration: 2.5,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

const clientele = document.querySelector(".clientele");

if (clientele) {
  clientele.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

    gsap.to(".clientele-grid", {
      x: -moveX,
      y: -moveY,

      duration: 1.2,

      ease: "power2.out",
    });
  });

  clientele.addEventListener("mouseleave", () => {
    gsap.to(".clientele-grid", {
      x: 0,
      y: 0,

      duration: 1,
    });
  });
}

/*=========================================================
                CASE STUDY OVERLAY
=========================================================*/

const caseCards = document.querySelectorAll(".case-card");
const overlays = document.querySelectorAll(".case-overlay");
const closeBtns = document.querySelectorAll(".overlay-close");

gsap.set(".overlay-hero", {
  y: 80,
  opacity: 0,
  scale: 0.96,
});

gsap.set(".overlay-intro", {
  y: 60,
  opacity: 0,
});

gsap.set(".overlay-block", {
  y: 40,
  opacity: 0,
});

gsap.set(".campaign-showcase", {
  y: 60,
  opacity: 0,
});

gsap.set(".campaign-line", {
  y: 60,
  opacity: 0,
});

gsap.set(".overlay-footer", {
  y: 60,
  opacity: 0,
});

/*=========================================================
OPEN
=========================================================*/

caseCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    document.body.style.overflow = "hidden";

    overlays[index].classList.add("active");

    gsap.to(
      overlays[index].querySelectorAll(
        ".overlay-hero, .overlay-intro, .overlay-block, .campaign-showcase, .campaign-line, .overlay-footer",
      ),
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      overlays[index],
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
      },
    );
  });
});

/*=========================================================
CLOSE
=========================================================*/

function closeOverlay(index) {
  gsap.to(overlays[index], {
    yPercent: 100,

    duration: 0.6,

    ease: "power4.in",

    onComplete() {
      overlays[index].classList.remove("active");

      document.body.style.overflow = "";

      gsap.set(overlays[index], {
        yPercent: 0,
      });
    },
  });
}

closeBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    closeOverlay(index);
  });
});

/*=========================================================
ESC
=========================================================*/

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    overlays.forEach((overlay, index) => {
      if (overlay.classList.contains("active")) {
        closeOverlay(index);
      }
    });
  }
});

/*=========================================================
CLICK OUTSIDE
=========================================================*/

overlays.forEach((overlay, index) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeOverlay(index);
    }
  });
});

/*=========================================================
                HERO IMAGE SEQUENCE
=========================================================*/

const heroCanvas = document.getElementById("hero-canvas");

if (heroCanvas) {
  const ctx = heroCanvas.getContext("2d");

  const frameCount = 240;

  const currentFrame = (index) =>
    `assets/videos/motionv1/frame_${String(index).padStart(3, "0")}.jpg`;

  const images = [];

  const sequence = {
    frame: 1,
  };

  function resizeCanvas() {
    heroCanvas.width = window.innerWidth * window.devicePixelRatio;
    heroCanvas.height = window.innerHeight * window.devicePixelRatio;

    heroCanvas.style.width = window.innerWidth + "px";
    heroCanvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0,
    );

    render();
  }

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();

  function render() {
    const img = images[sequence.frame];

    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const scale = Math.max(
      window.innerWidth / img.width,
      window.innerHeight / img.height,
    );

    const x = (window.innerWidth - img.width * scale) / 2;
    const y = (window.innerHeight - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();

    img.src = currentFrame(i);

    images[i] = img;

    if (i === 1) {
      img.onload = render;
    }
  }

  gsap.to(sequence, {
    frame: frameCount,

    snap: "frame",

    ease: "none",

    onUpdate: render,

    scrollTrigger: {
      trigger: "#hero",

      start: "top top",

      end: "+=4000",

      scrub: 0.2,

      pin: true,

      anticipatePin: 1,
    },
  });
}

/*=========================================================
WRITER WORLD
=========================================================*/

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".writer-world",

    start: "top+=50 top",

    end: "+=150%",

    scrub: true,

    pin: true,
  },
});

tl.to(
  ".writer-title",
  {
    scale: 0.88,

    opacity: 0.15,

    filter: "blur(10px)",

    duration: 1,
  },
  0,
);

tl.to(
  ".writer-small",
  {
    opacity: 0,

    y: -50,
  },
  0,
);

tl.to(
  ".writer-word",
  {
    y: gsap.utils.wrap([-250, 250]),

    opacity: 0,

    stagger: 0.05,
  },
  0,
);

tl.to(
  ".writer-gradient",
  {
    opacity: 0.95,
  },
  0.3,
);

/* Next section */

gsap.from(".intro", {
  y: 180,

  scale: 0.96,

  opacity: 0,

  ease: "power3.out",

  scrollTrigger: {
    trigger: ".intro",

    start: "top bottom",

    end: "top center",

    scrub: true,
  },
});
