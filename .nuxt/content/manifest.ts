export const checksums = {
  "posts": "v3.5.0--q-3teaqFP7c0o8zTZqO2tJychE2z4-4mM9jJJ95x76s"
}
export const checksumsStructure = {
  "posts": "n3AKIMODC-lde6rKNojd1U4j_LyO15TdEy6gftqQApo"
}

export const tables = {
  "posts": "_content_posts",
  "info": "_content_info"
}

export default {
  "posts": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "date": "string",
      "description": "string",
      "excerpt": "string",
      "extension": "string",
      "image": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}