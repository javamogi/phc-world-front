<template>
    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <li>
                    <router-link to="/"><i class="fa fa-dashboard fa-fw"></i> Dashboard</router-link>
                </li>
                <!-- <li>
                    <a href="#">
                        <i class="fa fa-table fa-fw"></i> Tables<span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="/diary"><i class="fa fa-edit"></i> Dairy</a>
                        </li>
                    </ul>
                </li> -->
                <li>
                    <a href="/boards"><i class="fa fa-list-alt"></i> Free Board</a>
                </li>
                <li>
                    <a href="/api/movies/page"><i class="glyphicon glyphicon-film"></i> 영화 검색</a>
                </li>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
    <!-- /.navbar-static-side -->
</template>

<script>
export default {

}
</script>

<style>

</style>