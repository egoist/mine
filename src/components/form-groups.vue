<template>
  <div class="form-group">

    <label for="groups">推荐到</label>

    <div class="groups_got"  v-if="groups.length > 0">

      <div class="group_got" v-repeat="group in groups">
        <label class="control radio" v-on="click: changeGroup" data-group-id="{{ group.objectId }}">
          <input name="radio" type="radio" checked="{{ current == group.objectId ? true : false }}">
          <span class="control-indicator"></span>
          {{ group.name }}
        </label>
      </div>
      <a v-link="{ path: '/new_group' }" class="fade" style="padding-left:2px"><i class="fa fa-plus"></i> &nbsp; 创建新圈子</a>
    </div>
    

    <div class="fade" v-if="groups.length == 0">
      你还没有圈子！
    </div>

  </div>

</template>

<script>
  const _ = require('../util')
  export default {
    props: ['on-groups-fetched', 'on-group-changed'],
    data () {
      return {
        groups: [],
        current: ''
      }
    },
    methods: {
      changeGroup (e) {
        e.preventDefault()
        const id = e.target.getAttribute('data-group-id')
        this.current = id
        this.onGroupChanged(id)
      }
    },
    ready () {
      const user_id = _.userdb.get().objectId
      this.$http.get(_.api('groups'), {user_id: user_id, fetchBy: 'user'}, data => {
        this.groups = data.groups
        this.onGroupsFetched(data.groups)

      })
    }
  }
</script>