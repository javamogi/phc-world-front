<template>
  <div>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">PHC WORLD</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">About Project</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#services">About Me</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <header class="masthead text-center text-white d-flex">
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <h1 class="text-uppercase">
              <strong>안녕하세요!</strong>
            </h1>
            <hr>
          </div>
          <div class="col-lg-8 mx-auto">
            <p class="text-faded mb-5">자바모기의 블로그입니다.@</p>
            <a class="btn btn-primary btn-xl js-scroll-trigger" href="#about">About</a>
          </div>
        </div>
      </div>
    </header>

    <section class="bg-primary" id="about">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-heading text-white">프로젝트 설명</h2>
            <hr class="light my-4">
            <p class="text-faded mb-4">이 프로젝트는 spring-boot/bootstrap/h2-database/jQuery/Ajax 로 만들었고 AWS에 배포했습니다.</p>
            <a class="btn btn-light btn-xl js-scroll-trigger" href="#services">About Me</a>
          </div>
        </div>
      </div>
    </section>

    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading">자바모기</h2>
            <hr class="my-4">
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-ban text-primary mb-3 sr-icon-1"></i>
              <h3 class="mb-3">끈기</h3>
              <p class="text-muted mb-0">어떠한 기능을 구현하고자 마음 먹으면 구현할 때 까지 한다.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-retweet text-primary mb-3 sr-icon-2"></i>
              <h3 class="mb-3">피드백</h3>
              <p class="text-muted mb-0">무엇을 잘했고 무엇이 부족했는지 생각하며 계속 고쳐나간다.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-puzzle-piece text-primary mb-3 sr-icon-3"></i>
              <h3 class="mb-3">다르게 생각하기</h3>
              <p class="text-muted mb-0">문제 해결에 있어 다양한 관점으로 바라보려고 노력한다.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-heart text-primary mb-3 sr-icon-4"></i>
              <h3 class="mb-3">즐거움</h3>
              <p class="text-muted mb-0">프로그래밍은 재밌다. 항상 즐기면서 하고싶다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-dark text-white" id="portfolio">
      <div class="container text-center">
        <h2 class="mb-4">이동하기를 클릭하시면 게시판을 이용하실 수 있습니다.</h2>
        <!-- <a class="btn btn-light btn-xl sr-button" href="http://startbootstrap.com/template-overviews/creative/">Download Now!</a> -->
        <a class="btn btn-light btn-xl sr-button" href="/home.html">이동하기!</a>
      </div>
    </section>

    <section id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-heading">보다 나은 모습으로</h2>
            <hr class="my-4">
            <p class="mb-5">더 나은 모습을 위해 지금도 노력하고 있으며 기회를 기다립니다. 연락 주세요!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center">
            <i class="fab fa-github fa-3x mb-3 sr-contact-2"></i>
            <p>
              <a href="https://github.com/javamogi/PHC-WORLD">이 프로젝트 github</a>
            </p>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fas fa-envelope fa-3x mb-3 sr-contact-2"></i>
            <p>
              <a href="mailto:your-email@your-domain.com">javamogi@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
}
</script>
