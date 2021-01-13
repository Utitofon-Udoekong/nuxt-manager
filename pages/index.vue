<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" :key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_id}}: {{employee.name}}
        <nuxt-link
          class="secondary-content"
          v-bind:to="{ name: 'ViewEmployee', params: { employee_id: employee.employee_id }}"
        >
          view
        </nuxt-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <nuxt-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  // data() {
  asyncData({ app }) {
    const teasers = [];
    const db = app.$firebase.firestore();

    return db
      .collection("employees")
      .orderBy("employee_id")
      .get()
      .then(querySnapshot => {
        for (const doc of querySnapshot.docs) {
          teasers.push({
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          })
        }
        return {
          teasers,
          employees: teasers
        };
      });
  },
};
</script>
<style scoped>
  #home{
    max-width: 600px;
  }
  li{
    padding: 20px;
    margin: 5px;
    background: rgb(243, 225, 225);
    border: 1px solid #000;
  }
</style>