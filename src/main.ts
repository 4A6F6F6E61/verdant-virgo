import fs, { PathLike } from "fs"
import YAML from "yaml"

export interface PicCat {
    cat: string
    preview: string
}

// yield return; function return ; .next() input
export function getPicCategories(): Array<PicCat> {
    let cats: Array<string> = fs.readdirSync("./public/Pictures")
    let ret = []
    for (let cat of cats)
        ret.push({
            cat: cat,
            preview: getPictures("./public/Pictures", cat)[0],
        } as PicCat)
    return ret
}

export function getPictures(
    path: PathLike,
    category: string
): Array<string | undefined> {
    return fs.readdirSync(`${path}/${category}`).map(pic => {
        if (
            pic.endsWith(".jpg") ||
            pic.endsWith(".webp") ||
            pic.endsWith(".png")
        )
            return pic
    })
}

export interface Comic {
    name: string
    artist: string
    series: Array<string>
    genre: Array<string>
    description?: string
}

export function loadComicData(name: string): Comic {
    return YAML.parse(
        fs.readFileSync(`./public/comics/${name}/info.yaml`, "utf8")
    )
}

export function loadComics(): Array<Comic> {
    let comics: Array<Comic> = []
    const dirs = fs
        .readdirSync("./public/comics", { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    for (let dir of dirs) {
        comics.push(loadComicData(dir))
    }
    return comics
}

export function loadComicChapters(name: string): Array<string> {
    return fs
        .readdirSync(`./public/comics/${name}`, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}
