import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function Cardcont() {
  return (
    <div className="py-20 flex justify-center ... ">
      <Card className="px-20"  >
        <CardHeader className="flex gap-3 justify-center ...">
          <Image
            alt="nextui logo"
            height={40}
            radius="full"
            src="/aboutus2img/badge.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Contact Information</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p className="text-large">Address</p>
          <p className="text-small">Information Technology Center</p>
          <p className="text-small">University of Peradeniya</p>
          <p className="text-small">Peradeniya,</p>
          <p className="text-small">Sri Lanka.</p>
        </CardBody>
        <Divider/>
        <CardBody>
          <p className=" text-large">Tel</p>
          <p className=" text-small">+94 (0) 81 2384848</p>
          <p className=" text-small">+94(0) 81 2392070</p>
          <p className=" text-small">+94 (0) 81 2392900</p>
          <p className=" text-small"></p>
        </CardBody>
        <Divider/>
        <CardBody>
          <p className=" text-large">PABX:</p>
          <p className=" text-small">2070 / 2900</p>
        </CardBody>
        <Divider/>
        <CardBody>
          <p className=" text-large">E-mail</p>
          <Link
            isExternal
            showAnchorIcon
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcRzBWdvsccVRnLTxGdHwBBKthJknpHtbpZdvMTgktqzlGWTTBzLMNvPJFWZFVrxxJfsWmsNq">
            info@ceit.pdn.ac.lk
          </Link>
        </CardBody>
        <Divider/>
        <CardBody>
          <p className=" text-large">Web</p>
          <Link
            isExternal
            showAnchorIcon
            href="http://www.ceit.pdn.ac.lk/">
            www.ceit.pdn.ac.lk
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
