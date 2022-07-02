<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.go(-1)"
        @focus="isSearch = false"
      />
    </form>
    <!-- 搜索历史 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <!-- 搜索结果 -->
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <!-- 搜索建议 -->
      <SearchSuggest v-else :searchText="searchText" @search="onSearch">
      </SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '', // 输入框内容
      isSearch: false // 默认为搜索建议
    }
  },
  methods: {
    onSearch (src) {
      this.searchText = src
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', src)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
.van-search__action {
  color: #fff;
}
</style>
