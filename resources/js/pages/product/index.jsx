
import AppLayout from '@/layouts/app-layout';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, usePage } from '@inertiajs/react';
import { Badge, Loader } from 'lucide-react';
import InputError from '@/components/input-error';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const ProductPage = () => {

    const { products } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm(
        {
            "name": "",
            "price": "",
            "stock": ""
        }
    )



    const createProduct = () => {


        post("/product/store", {

            onSuccess: () => { reset("name", "price", "stock") },
            // onError: () => { alert("error") },
            // onFinish: ()=> {alert("sala")}
        })


        // console.log(errors);




    }



    return (


        <>
            <AppLayout>
                <div className="p-6">


                    <div className="flex items-center justify-between">
                        <h1>Create Product</h1>


                        {/* modal */}

                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-sm">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you&apos;re
                                            done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='space-y-6'>
                                        <div className='space-y-2'>
                                            <Label htmlFor="name-1">Name</Label>
                                            <Input value={data.name} onChange={(e) => setData("name", e.target.value)} id="name-1" name="name" placeholder={"Product Name"} />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor="username-1">Price</Label>
                                            <Input value={data.price} onChange={(e) => setData("price", e.target.value)} type="number" id="username-1" name="price" placeholder={"Product Price"} />
                                            <InputError message={errors.price} />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor="username-1">Stock</Label>
                                            <Input value={data.stock} onChange={(e) => setData("stock", e.target.value)} type="number" id="username-1" name="stock" placeholder={"Product Stock"} />
                                            <InputError message={errors.stock} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button onClick={createProduct} disabled={processing} type="submit">{processing ? <Loader className='animate-spin' /> : "Save"}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>






                    <div className="grid grid-cols-4 gap-6 py-6">

                        {
                            products.map((p, i) =>
                                <Card className="relative mx-auto w-full max-w-sm pt-0">
                                    <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                    <img
                                        src="https://avatar.vercel.sh/shadcn1"
                                        alt="Event cover"
                                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                    />
                                    <CardHeader>
                                        <div>
                                            <Badge variant="secondary">Featured</Badge>
                                        </div>
                                        <CardTitle>{p.name}</CardTitle>
                                        <CardDescription>
                                           {p.price} $
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button className="w-full">View Event</Button>
                                    </CardFooter>
                                </Card>


                            )
                        }
                    </div>


                </div>


            </AppLayout>
        </>
    )

}

export default ProductPage



