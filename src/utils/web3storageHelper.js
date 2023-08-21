import { Web3Storage } from 'web3.storage'

const upload = async (file) => {
    const web3s = new Web3Storage({  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzZTBCQWM5RmI5NWJhYTRiQTI0Y0ZGZjhhMDQ2Nzc3QmE5RUExMWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODQwMDkyNzMzNDAsIm5hbWUiOiJhZSJ9.1H_WgjOPY82hqOY07GnUTyzgpvPtD2o8vrAMXut84Pc' })
    const cid = await web3s.put([file], { wrapWithDirectory: false })
    return cid
}

export { upload }