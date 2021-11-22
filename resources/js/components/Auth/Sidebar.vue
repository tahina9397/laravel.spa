<template>
  <div>
    <div class="span3">
      <div class="sidebar">
        <ul class="widget widget-menu unstyled">
          <li class="active">
            <router-link :to="{ name: 'Dashboard' }" exact
              ><i class="menu-icon icon-dashboard"></i
              >&nbsp;Dashboard</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Profile' }"
              ><i class="menu-icon icon-dashboard"></i
              >&nbsp;Profile</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Security' }"
              ><i class="menu-icon icon-dashboard"></i
              >&nbsp;Security</router-link
            >
          </li>
          <!-- <li>
            <a href="message.html">
              <i class="menu-icon icon-inbox"></i>
              Inbox
              <b class="label green pull-right">11</b>
            </a>
          </li> -->
        </ul>
        <!--/.widget-nav-->

        <ul class="widget widget-menu unstyled">
          <li>
            <router-link :to="{ name: 'Tutos' }"
              ><i class="menu-icon icon-dashboard"></i>&nbsp;Tutos</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Liste' }"
              ><i class="menu-icon icon-dashboard"></i>&nbsp;Postes</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Formulaire' }"
              ><i class="menu-icon icon-dashboard"></i>&nbsp;Formulaire</router-link
            >
          </li>
          <li>
            <a href="javascript:void(0)" @click="logout()">
              <i class="menu-icon icon-signout"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
      <!--/.sidebar-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
