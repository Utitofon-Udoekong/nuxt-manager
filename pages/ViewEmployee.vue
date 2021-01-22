<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{employees.name}}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{employees.employee_id}}</li>
      <li class="collection-item">Department: {{employees.dept}}</li>
      <li class="collection-item">Position: {{employees.position}}</li>
    </ul>
    <nuxt-link to="/" class="btn grey">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </nuxt-link>
    <font-awesome-icon @click="deleteEmployee" :icon="['fas', 'trash']" />

    <div class="fixed-action-btn">
      <nuxt-link
        :to="{ name: 'editEmployee', params: { employee_id: employees.employee_id }}"
        class="btn-floating btn-large red"
      >
        <font-awesome-icon :icon="['fas', 'pen']" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { fireDb } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      employees: null
    };
  },
  async asyncData ({params, error}) {
    const ref = fireDb
      .collection("employees")
    let snap;
    let teasers = []
    try {
      snap = await ref.where("employee_id", "==", params.employee_id).get()
      snap.docs.map(doc => {
        teasers = doc.data()
      })
    } catch (error) {
      console.error(error);
    }
    return{
      employees: teasers
    }
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    async fetchData() {
      const ref = fireDb.collection("employees")
      let snap;
      let teasers = []
      try {
        snap = await ref.where("employee_id","==",this.$route.params.employee_id);
        snap.docs.map(doc => {
          teasers = doc.data()
      })
      } catch (error) {
        console.error(error)
      }
      return{
        employees: teasers
      }
    },
    async deleteEmployee() {
      if (confirm("Are you sure?")) {
        const ref = fireDb
          .collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id);
        let snap;
        try {
          snap = await ref.get();
          snap.forEach(doc => {
            doc.ref.delete();
            this.$router.push("/");
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>
